// === 고수 노하우 규칙 매칭 엔진 (Expert Rule Layer) ===
//
// - js/expert-rules-data.js 의 EXPERT_RULES 및 EXPERT_PRINCIPLES 를 참조하여
//   현재 현장 환경(state + 실시간 기상/수위 live)에 부합하는 프로 노하우 규칙을 매칭합니다.
// - 핵심 원칙:
//   1) 2개 이상의 독립 권위 출처(sourceCount >= 2)로 교차 검증된 규칙만 랭킹 점수에 반영 (상한 +15 / 하한 -10)
//   2) 단일 출처(sourceCount === 1) 규칙은 effect.score === 0 으로 상세 패널에 '참고 노하우'로만 표시

const ExpertEngine = {
  // state + live → 매칭 컨텍스트 (자동 추정 변수 포함)
  buildContext(state, live) {
    let pressure = null;
    if (live) {
      const d = live.pressureDiff3h || 0;
      if (d <= -0.5) pressure = "falling";
      else if (d >= 0.6) pressure = "rising";
      else if (live.pressure >= 1020) pressure = "high";
      else pressure = "stable";
    }

    const sky = live?.cloudFactor ?? null;
    const coldFront = !!(
      live &&
      (live.tempDiff24h || 0) <= -4 &&
      ((live.pressureDiff3h || 0) >= 0.6 || (live.pressure || 0) >= 1020)
    );
    const freshMud = !!(live && (live.precip72h || 0) >= 20 && state.clarity === "muddy");

    return {
      ...state,
      pressure,
      sky,
      coldFront,
      freshMud
    };
  },

  // 단일 규칙 매칭 여부 검사
  matches(rule, ctx) {
    if (!rule || !rule.when) return false;
    return Object.entries(rule.when).every(([k, v]) => {
      if (k === "tempRange") {
        return ctx.temp >= v[0] && ctx.temp <= v[1];
      }
      if (ctx[k] == null) return false; // 실시간 데이터가 없으면 기압/하늘 조건 규칙은 미적용
      return Array.isArray(v) ? v.includes(ctx[k]) : v === ctx[k];
    });
  },

  // 구체적일수록(조건 수 多) · 독립 출처가 많을수록 우선순위 상승
  rank(rule) {
    const condCount = Object.keys(rule.when || {}).length;
    const srcCount = Math.min(rule.sourceCount || 1, 4);
    return condCount * 10 + srcCount * 5;
  },

  // 전체 규칙 평가 및 루어별 그룹핑
  evaluate(state, live) {
    const ctx = this.buildContext(state, live);
    const rulesList = typeof EXPERT_RULES !== "undefined" && Array.isArray(EXPERT_RULES) ? EXPERT_RULES : [];
    const matched = rulesList.filter(r => this.matches(r, ctx));
    const byLure = {};
    for (const r of matched) {
      (byLure[r.lureId] ||= []).push(r);
    }
    for (const id in byLure) {
      byLure[id].sort((a, b) => this.rank(b) - this.rank(a));
    }
    return {
      ctx,
      matchedCount: matched.length,
      byLure
    };
  },

  // 루어별 점수 보너스: 1번째 100%, 2번째 50%, 3번째 25% 감소 합산 (상한 +15 / 하한 -10)
  lureBonus(lureId, result) {
    if (!result || !result.byLure) return 0;
    const rules = result.byLure[lureId] || [];
    if (rules.length === 0) return 0;
    const raw = rules.reduce((sum, r, i) => {
      const sc = r.sourceCount >= 2 ? (r.effect?.score || 0) : 0;
      return sum + sc * Math.pow(0.5, i);
    }, 0);
    return Math.max(-10, Math.min(15, Math.round(raw)));
  },

  // 현재 환경에 맞는 범용 싱커 무게 가이드 반환 (T13)
  getDynamicWeightPrinciple(state) {
    if (typeof EXPERT_PRINCIPLES === "undefined" || !EXPERT_PRINCIPLES.weightRules) return null;
    const byCond = EXPERT_PRINCIPLES.weightRules.byCondition;
    if (state.wind === "strong" || state.waterTrend === "falling" || state.struct === "deep_open") {
      return byCond.deep_wind_search;
    }
    if (state.season === "summer" && state.temp >= 25 && (state.struct === "shallow_weed" || state.struct === "heavy_cover")) {
      return byCond.heavy_mat_punching;
    }
    if (state.clarity === "muddy" && state.struct === "heavy_cover") {
      return byCond.reaction_stroking;
    }
    if (state.struct === "shallow_weed") {
      return byCond.shallow_finesse;
    }
    return byCond.standard_breakline;
  },

  // 현재 환경에 맞는 하드베이트 표면 마감(GP/GG/MAT) 가이드 반환 (T14)
  getDynamicFinishPrinciple(ctx) {
    if (typeof EXPERT_PRINCIPLES === "undefined" || !EXPERT_PRINCIPLES.finishMatrix) return null;
    const list = EXPERT_PRINCIPLES.finishMatrix.rules;
    if (ctx.clarity === "muddy" || ctx.sky === "overcast" || ctx.sky === "rain" || ctx.coldFront) {
      return list[2]; // MAT (무광 / 솔리드 & 하이콘트라스트)
    }
    if (ctx.wind === "moderate" || ctx.wind === "strong") {
      return list[1]; // GG (메탈릭 플래시)
    }
    return list[0]; // GP (반투명 / 고스트)
  },

  // 상세 패널 표시용 데이터 패키지 반환
  adviceFor(lureId, result) {
    if (!result || !result.byLure) return null;
    const rules = result.byLure[lureId] || [];
    const weightPrinciple = this.getDynamicWeightPrinciple(result.ctx);
    const finishPrinciple = this.getDynamicFinishPrinciple(result.ctx);
    return {
      primary: rules[0] || null,
      others: rules.slice(1, 3),
      bonus: this.lureBonus(lureId, result),
      weightPrinciple,
      finishPrinciple
    };
  }
};
