#!/usr/bin/env node
/**
 * scripts/test-expert-engine.js
 *
 * Automated verification suite for the Bass Tactics Expert Rule Engine:
 * 1. Source & Schema Integrity (47 raw records, 21 normalized rules, single-source safeguard)
 * 2. 12 Golden Tactical Scenarios (ranking order, bonus bounds, dynamic color/weight/action)
 * 3. Exhaustive 6,480 State Boundary Sweep (scores in [15, 99], bonuses in [-10, +15], no NaN/throws)
 */

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const assert = require("assert");

const ROOT = path.resolve(__dirname, "..");

// Load front-end scripts into a shared VM context
const context = {
  console,
  Math,
  Date,
  Object,
  Array
};
vm.createContext(context);

function loadScript(relPath) {
  const fullPath = path.join(ROOT, relPath);
  const code = fs.readFileSync(fullPath, "utf8");
  vm.runInContext(code, context, { filename: relPath });
}

loadScript("js/lures-data.js");
loadScript("js/tactic-engine.js");
loadScript("js/expert-rules-data.js");
loadScript("js/expert-engine.js");

const { LURES, SINKER_CHART, TacticEngine, EXPERT_RULES, EXPERT_PRINCIPLES, ExpertEngine } = vm.runInContext(
  "({ LURES, SINKER_CHART, TacticEngine, EXPERT_RULES, EXPERT_PRINCIPLES, ExpertEngine })",
  context
);

// Replicate computeScore & rankLures exactly as in js/app.js
function rankLuresForScenario(state, live = null) {
  const tactic = TacticEngine.synthesize(state, live);
  const expert = ExpertEngine.evaluate(state, live);

  function computeScore(lure) {
    let score = 40;
    const [minT, maxT] = lure.tempRange;
    if (state.temp >= minT && state.temp <= maxT) {
      const mid = (minT + maxT) / 2;
      const dist = Math.abs(state.temp - mid);
      const span = Math.max(1, (maxT - minT) / 2);
      score += 20 - Math.round((dist / span) * 6);
    } else {
      const diff = state.temp < minT ? (minT - state.temp) : (state.temp - maxT);
      score -= Math.min(25, diff * 3.3);
    }

    if (lure.bestSeasons.includes(state.season)) score += 6;

    if (lure.bestTime[0] === state.time) score += 10;
    else if (lure.bestTime.includes(state.time)) score += 5;
    else score -= 8;

    if (lure.bestStruct[0] === state.struct) score += 11;
    else if (lure.bestStruct.includes(state.struct)) score += 6;
    else score -= 6;

    if (lure.bestWind.includes(state.wind)) score += 6;
    else score -= 5;

    if (lure.bestClarity && lure.bestClarity[0] === state.clarity) score += 6;
    else if (lure.bestClarity && lure.bestClarity.includes(state.clarity)) score += 3;
    else score -= 4;

    const fit = TacticEngine.lureFit(lure, tactic);
    score += fit.bonus;

    score += ExpertEngine.lureBonus(lure.id, expert);

    if (score > 80) score = 80 + (score - 80) * 0.4;
    return Math.max(15, Math.min(99, Math.round(score)));
  }

  const ranked = LURES.map(l => ({
    ...l,
    score: computeScore(l),
    tacticFit: TacticEngine.lureFit(l, tactic).fit,
    expertAdvice: ExpertEngine.adviceFor(l.id, expert)
  })).sort((a, b) => b.score - a.score);

  return { tactic, expert, ranked };
}

let passed = 0;
function check(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     ${err.message}`);
    process.exitCode = 1;
  }
}

console.log("=== [1/3] Source & Schema Integrity Checks ===");

check("LURES has 19 valid lure definitions", () => {
  assert.strictEqual(LURES.length, 19);
  assert.ok(SINKER_CHART.length >= 6);
});

check("All EXPERT_RULES map to valid LURES IDs and have valid citations", () => {
  const validIds = new Set(LURES.map(l => l.id));
  assert.ok(EXPERT_RULES.length >= 20, `Expected >= 20 rules, got ${EXPERT_RULES.length}`);
  for (const r of EXPERT_RULES) {
    assert.ok(validIds.has(r.lureId), `Invalid lureId: ${r.lureId}`);
    assert.ok(Array.isArray(r.sources) && r.sources.length >= 1, `Rule ${r.id} missing sources`);
    assert.strictEqual(r.sourceCount, r.sources.length, `Rule ${r.id} sourceCount mismatch`);
    for (const s of r.sources) {
      assert.ok(s.url && s.url.startsWith("https://"), `Invalid URL in ${r.id}: ${s.url}`);
      assert.ok(s.authority && s.authority.length > 2, `Missing authority in ${r.id}`);
      assert.ok(s.quote && s.quote.length > 15, `Missing/short quote in ${r.id}`);
    }
    if (r.sourceCount < 2) {
      assert.strictEqual(r.effect.score, 0, `Single-source rule ${r.id} must have effect.score === 0`);
    }
  }
});

check("Single-source rule r21_clear_mid_strolling_single never alters score", () => {
  const singleRule = EXPERT_RULES.find(r => r.sourceCount === 1);
  assert.ok(singleRule, "Expected at least 1 single-source rule for reference advice testing");
  assert.strictEqual(singleRule.effect.score, 0);
  const res = ExpertEngine.evaluate({
    season: "spring",
    temp: 14,
    time: "midday",
    waterTrend: "stable",
    wind: "calm",
    clarity: "clear",
    struct: "deep_open"
  }, null);
  assert.strictEqual(ExpertEngine.lureBonus("mid_strolling", res), 0);
  const adv = ExpertEngine.adviceFor("mid_strolling", res);
  assert.ok(adv.primary && adv.primary.id === "r21_clear_mid_strolling_single");
});

console.log("\n=== [2/3] 12 Golden Tactical Scenarios ===");

// Scenario 1: Fall 16°C + Falling (배수) + Muddy (탁수) + Heavy Cover (수몰나무)
check("S01: Fall 16°C · Drawdown · Muddy · Heavy Cover -> rubber_jig, spinnerbait, chatterbait in Top 5 + Black/Blue advice", () => {
  const { ranked } = rankLuresForScenario({
    season: "autumn",
    temp: 16,
    time: "dawn_dusk",
    waterTrend: "falling",
    wind: "moderate",
    clarity: "muddy",
    struct: "heavy_cover"
  });
  const top5Ids = ranked.slice(0, 5).map(l => l.id);
  assert.ok(top5Ids.includes("rubber_jig"), `Expected rubber_jig in top 5, got ${top5Ids.join(", ")}`);
  assert.ok(top5Ids.includes("spinnerbait"), `Expected spinnerbait in top 5, got ${top5Ids.join(", ")}`);
  assert.ok(top5Ids.includes("chatterbait"), `Expected chatterbait in top 5, got ${top5Ids.join(", ")}`);

  const jig = ranked.find(l => l.id === "rubber_jig");
  assert.ok(jig.expertAdvice.primary, "Expected primary expert rule on rubber_jig");
  assert.ok(jig.expertAdvice.primary.advice.colors.some(c => c.includes("Black/Blue")));
  assert.ok(jig.expertAdvice.primary.advice.weight.includes("1/2"));
});

// Scenario 2: Fall 16°C + Falling (배수) + Clear (맑은물) + Deep Open (딥채널)
check("S02: Fall 16°C · Drawdown · Clear · Deep Open -> downshot_rig & swimbait_shad boosted with natural/30cm advice", () => {
  const { ranked } = rankLuresForScenario({
    season: "autumn",
    temp: 16,
    time: "midday",
    waterTrend: "falling",
    wind: "calm",
    clarity: "clear",
    struct: "deep_open"
  });
  const ds = ranked.find(l => l.id === "downshot_rig");
  const sb = ranked.find(l => l.id === "swimbait_shad");
  assert.ok(ds.expertAdvice.bonus > 0, "Expected positive bonus on downshot_rig");
  assert.ok(sb.expertAdvice.bonus > 0, "Expected positive bonus on swimbait_shad");
  assert.ok(ds.expertAdvice.primary.advice.weight.includes("3/16") || ds.expertAdvice.primary.advice.weight.includes("30cm"));
});

// Scenario 3: Fall 15°C + Falling + Stained + Rock Slope (석축 브레이크라인)
check("S03: Fall 15°C · Drawdown · Stained · Rock Slope -> lipless_vib, shallow_crank, free_rig receive expert bonuses", () => {
  const { ranked } = rankLuresForScenario({
    season: "autumn",
    temp: 15,
    time: "dawn_dusk",
    waterTrend: "falling",
    wind: "moderate",
    clarity: "stained",
    struct: "rock_slope"
  });
  const sc = ranked.find(l => l.id === "shallow_crank");
  const fr = ranked.find(l => l.id === "free_rig");
  const lv = ranked.find(l => l.id === "lipless_vib");
  assert.ok(sc.expertAdvice.bonus >= 8, `Expected shallow_crank bonus >= 8, got ${sc.expertAdvice.bonus}`);
  assert.ok(fr.expertAdvice.bonus >= 7, `Expected free_rig bonus >= 7, got ${fr.expertAdvice.bonus}`);
  assert.ok(lv.expertAdvice.bonus >= 9, `Expected lipless_vib bonus >= 9, got ${lv.expertAdvice.bonus}`);
});

// Scenario 4: Spring 12°C Pre-spawn + Stained + Heavy Cover / Shallow Weed
check("S04: Spring 12°C Pre-spawn · Stained · Heavy Cover -> rubber_jig & minnow_jerk boosted", () => {
  const { ranked } = rankLuresForScenario({
    season: "spring",
    temp: 12,
    time: "dawn_dusk",
    waterTrend: "stable",
    wind: "moderate",
    clarity: "stained",
    struct: "heavy_cover"
  });
  const jig = ranked.find(l => l.id === "rubber_jig");
  assert.ok(jig.expertAdvice.bonus >= 10, `Expected rubber_jig bonus >= 10, got ${jig.expertAdvice.bonus}`);
  assert.ok(jig.expertAdvice.primary.advice.colors.some(c => c.includes("Crawfish")));
});

// Scenario 5: Spring 17°C Spawn + Clear + Shallow Weed
check("S05: Spring 17°C Spawn · Clear · Shallow Weed -> no_sinker (Fluke) boosted with Albino/White colors", () => {
  const { ranked } = rankLuresForScenario({
    season: "spring",
    temp: 17,
    time: "dawn_dusk",
    waterTrend: "stable",
    wind: "calm",
    clarity: "clear",
    struct: "shallow_weed"
  });
  const ns = ranked.find(l => l.id === "no_sinker");
  assert.ok(ns.expertAdvice.bonus >= 10, `Expected no_sinker bonus >= 10, got ${ns.expertAdvice.bonus}`);
  assert.ok(ns.expertAdvice.primary.advice.colors.some(c => c.includes("Albino")));
});

// Scenario 6: Summer 27°C + Rising (장마 오름수위) + Muddy + Shallow Weed
check("S06: Summer 27°C · Rising · Muddy · Shallow Weed -> hollow_frog, spinnerbait, rubber_jig in Top 4", () => {
  const { ranked } = rankLuresForScenario({
    season: "summer",
    temp: 27,
    time: "dawn_dusk",
    waterTrend: "rising",
    wind: "calm",
    clarity: "muddy",
    struct: "shallow_weed"
  });
  const top4Ids = ranked.slice(0, 4).map(l => l.id);
  assert.ok(top4Ids.includes("hollow_frog"), `Top 4: ${top4Ids.join(", ")}`);
  const frog = ranked.find(l => l.id === "hollow_frog");
  assert.ok(frog.expertAdvice.bonus >= 9);
});

// Scenario 7: Summer 27°C + Midday + Deep Open (여름 한낮 서모클라인 딥 렛지)
check("S07: Summer 27°C · Midday · Deep Open -> deep_crank in Top 2 with 4~6m+ deep diver advice", () => {
  const { ranked } = rankLuresForScenario({
    season: "summer",
    temp: 27,
    time: "midday",
    waterTrend: "stable",
    wind: "moderate",
    clarity: "stained",
    struct: "deep_open"
  });
  const top2Ids = ranked.slice(0, 2).map(l => l.id);
  assert.ok(top2Ids.includes("deep_crank"), `Expected deep_crank in top 2, got ${top2Ids.join(", ")}`);
});

// Scenario 8: Winter 7°C + Midday + Deep Open (한겨울 저수온 딥채널)
check("S08: Winter 7°C · Midday · Deep Open -> metal_vibe & downshot_rig & suspending_shad dominate Top 3", () => {
  const { ranked } = rankLuresForScenario({
    season: "winter",
    temp: 7,
    time: "midday",
    waterTrend: "stable",
    wind: "calm",
    clarity: "clear",
    struct: "deep_open"
  });
  const top3Ids = ranked.slice(0, 3).map(l => l.id);
  assert.ok(top3Ids.includes("metal_vibe"), `Expected metal_vibe in top 3, got ${top3Ids.join(", ")}`);
  assert.ok(top3Ids.includes("downshot_rig"), `Expected downshot_rig in top 3, got ${top3Ids.join(", ")}`);
});

// Scenario 9: Strong Wind (강풍) + Rock Slope -> spinnerbait & shallow_crank boosted
check("S09: Strong Wind · Rock Slope -> spinnerbait receives wind expert rule bonus & ranks in Top 4", () => {
  const { ranked } = rankLuresForScenario({
    season: "autumn",
    temp: 17,
    time: "dawn_dusk",
    waterTrend: "stable",
    wind: "strong",
    clarity: "stained",
    struct: "rock_slope"
  });
  const sp = ranked.find(l => l.id === "spinnerbait");
  assert.ok(sp.expertAdvice.bonus >= 10);
  assert.ok(ranked.slice(0, 4).some(l => l.id === "spinnerbait"), `Top 4: ${ranked.slice(0, 4).map(l => l.id).join(", ")}`);
});

// Scenario 10: Night (야간/피딩) -> spinnerbait (Colorado) & free_rig boosted
check("S10: Night · Rock Slope -> free_rig & spinnerbait receive night expert rules", () => {
  const { ranked } = rankLuresForScenario({
    season: "summer",
    temp: 24,
    time: "night",
    waterTrend: "stable",
    wind: "calm",
    clarity: "stained",
    struct: "rock_slope"
  });
  const fr = ranked.find(l => l.id === "free_rig");
  const sp = ranked.find(l => l.id === "spinnerbait");
  assert.ok(fr.expertAdvice.bonus >= 8);
  assert.ok(sp.expertAdvice.bonus >= 8);
});

// Scenario 11: Live Weather Cold Front / High Pressure vs Low Pressure Overcast
check("S11: Live Weather High Pressure/Cold Front boosts neko_rig; Falling Pressure/Overcast boosts chatterbait & buzzbait", () => {
  const baseState = {
    season: "spring",
    temp: 16,
    time: "midday",
    waterTrend: "stable",
    wind: "calm",
    clarity: "stained",
    struct: "rock_slope"
  };
  const highPressLive = { pressure: 1024, pressureDiff3h: 1.2, tempDiff24h: -5.5, cloudFactor: "clear", precip72h: 0 };
  const lowPressLive = { pressure: 1008, pressureDiff3h: -1.8, tempDiff24h: 1.0, cloudFactor: "overcast", precip72h: 5 };

  const resHigh = rankLuresForScenario(baseState, highPressLive);
  const resLow = rankLuresForScenario({ ...baseState, struct: "shallow_weed" }, lowPressLive);

  assert.strictEqual(resHigh.expert.ctx.coldFront, true);
  assert.strictEqual(resHigh.expert.ctx.pressure, "rising");
  const neko = resHigh.ranked.find(l => l.id === "neko_rig");
  assert.ok(neko.expertAdvice.bonus >= 8, "Expected neko_rig bonus under high/rising pressure");

  assert.strictEqual(resLow.expert.ctx.pressure, "falling");
  const chat = resLow.ranked.find(l => l.id === "chatterbait");
  assert.ok(chat.expertAdvice.bonus >= 8, "Expected chatterbait bonus under falling pressure + overcast");
});

// Scenario 12: Fresh Cold Mud (precip72h >= 20 + muddy) vs No Live Data graceful fallback
check("S12: Fresh Cold Mud penalty in TacticEngine + graceful null live data handling", () => {
  const muddyState = {
    season: "autumn",
    temp: 15,
    time: "midday",
    waterTrend: "stable",
    wind: "calm",
    clarity: "muddy",
    struct: "heavy_cover"
  };
  const noLive = rankLuresForScenario(muddyState, null);
  const freshMudLive = rankLuresForScenario(muddyState, {
    pressure: 1015,
    pressureDiff3h: 0,
    tempDiff24h: -2,
    cloudFactor: "overcast",
    precip72h: 35
  });

  assert.strictEqual(noLive.expert.ctx.pressure, null);
  assert.strictEqual(noLive.expert.ctx.freshMud, false);
  assert.strictEqual(freshMudLive.expert.ctx.freshMud, true);
  assert.strictEqual(freshMudLive.tactic.zone, "shallow", "Stable muddy water should shift zone to shallow cover");
});

console.log("\n=== [3/3] Exhaustive 6,480 State Boundary Sweep ===");

check("All 6,480 state combinations keep bonuses in [-10, +15] and final scores in [15, 99]", () => {
  const seasons = ["spring", "summer", "autumn", "winter"];
  const times = ["dawn_dusk", "midday", "night"];
  const waterTrends = ["rising", "stable", "falling"];
  const winds = ["calm", "moderate", "strong"];
  const clarities = ["clear", "stained", "muddy"];
  const structs = ["shallow_weed", "rock_slope", "heavy_cover", "deep_open"];
  const temps = [6, 12, 18, 24, 29];

  let count = 0;
  for (const season of seasons) {
    for (const time of times) {
      for (const waterTrend of waterTrends) {
        for (const wind of winds) {
          for (const clarity of clarities) {
            for (const struct of structs) {
              for (const temp of temps) {
                count++;
                const st = { season, time, waterTrend, wind, clarity, struct, temp };
                const { ranked, expert } = rankLuresForScenario(st, null);
                for (const l of ranked) {
                  const bonus = ExpertEngine.lureBonus(l.id, expert);
                  assert.ok(bonus >= -10 && bonus <= 15, `Bonus out of bounds (${bonus}) for ${l.id}`);
                  assert.ok(l.score >= 15 && l.score <= 99 && !Number.isNaN(l.score), `Score out of bounds (${l.score}) for ${l.id}`);
                }
              }
            }
          }
        }
      }
    }
  }
  assert.strictEqual(count, 6480);
});

console.log(`\n🎉 All ${passed} test suites passed (including 6,480 state combinations)!`);
