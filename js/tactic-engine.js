// === 통합 전술 합성 엔진 (기압 · 기온 · 수온 · 수위 · 광량 · 시간대 · 바람 → 배스 위치/활성 → 전술 → 루어 가중치) ===
//
// 1) 각 환경 요인을 '배스 활성(mood)' 점수로 합산 → 활성도 3단계 (aggressive / neutral / negative)
// 2) 수위·수온·시간대로 '배스 위치(zone)' 결정 → shallow(연안 커버) / breakline(1차 브레이크) / deep(본류 물골)
// 3) 활성도 → 공략 템포(speed) 결정 → fast(리액션 무빙) / medium(중속 스위밍·저킹) / slow(피네스·커버 피칭)
// 4) zone × speed 조합으로 단일 통합 전술을 만들고, 각 루어의 템포/수심 프로필과 비교해 랭킹 가중치를 부여

const TacticEngine = {
  // 루어별 공략 템포(첫 번째가 주력) & 공략 존(첫 번째가 주력)
  LURE_PROFILE: {
    top_popper_pencil: { speeds: ["fast"], zones: ["shallow"] },
    shallow_crank:     { speeds: ["fast", "medium"], zones: ["shallow"] },
    deep_crank:        { speeds: ["medium", "fast"], zones: ["breakline", "deep"] },
    minnow_jerk:       { speeds: ["medium"], zones: ["shallow", "breakline"] },
    suspending_shad:   { speeds: ["medium", "slow"], zones: ["breakline"] },
    lipless_vib:       { speeds: ["fast"], zones: ["breakline", "shallow"] },
    metal_vibe:        { speeds: ["slow", "medium"], zones: ["deep"] },
    spinnerbait:       { speeds: ["fast", "medium"], zones: ["shallow"] },
    chatterbait:       { speeds: ["fast", "medium"], zones: ["shallow", "breakline"] },
    buzzbait:          { speeds: ["fast"], zones: ["shallow"] },
    hollow_frog:       { speeds: ["slow", "medium"], zones: ["shallow"] },
    no_sinker:         { speeds: ["slow"], zones: ["shallow"] },
    kaizer_rig:        { speeds: ["medium", "slow"], zones: ["breakline", "deep"] },
    neko_rig:          { speeds: ["slow"], zones: ["breakline", "shallow"] },
    downshot_rig:      { speeds: ["slow"], zones: ["deep", "breakline"] },
    free_rig:          { speeds: ["slow"], zones: ["shallow", "breakline"] },
    mid_strolling:     { speeds: ["medium"], zones: ["deep", "breakline"] },
    swimbait_shad:     { speeds: ["medium"], zones: ["breakline", "shallow"] },
    rubber_jig:        { speeds: ["slow"], zones: ["shallow", "breakline"] }
  },

  ZONE_LABELS: {
    shallow: "연안 쉘로우 커버",
    breakline: "1차 브레이크라인",
    deep: "딥 · 본류 물골"
  },

  SPEED_LABELS: {
    fast: "빠른 리액션 무빙",
    medium: "중속 스위밍·저킹",
    slow: "슬로우 피네스·피칭"
  },

  COMBOS: {
    shallow: {
      fast: {
        title: "🔥 연안 쉘로우 리액션 무빙",
        desc: "배스가 연안으로 올라와 적극적으로 사냥하는 최상의 조합입니다. 수초 엣지·잠긴 육초·바람 맞는 연안을 스피너베이트·채터베이트·쉘로우 크랭크로 빠르게 훑어 반응하는 개체부터 뽑아내세요."
      },
      medium: {
        title: "🎯 연안 커버 스위밍 & 저킹",
        desc: "배스가 연안에 붙어 있지만 추격 의지는 보통입니다. 커버 엣지를 따라 미노우 저킹·섀드웜 스위밍·노싱커 트위칭으로 템포를 한 단계 늦추고, 반응이 없으면 커버 속으로 피칭하세요."
      },
      slow: {
        title: "🛡️ 연안 커버 속 슬로우 피칭",
        desc: "배스는 연안 커버에 들어와 있지만 활성이 낮아 루어를 쫓지 않습니다. 빠른 무빙 대신 잠긴 육초·수몰나무·갈대 포켓 깊숙이 러버지그·프리리그·노싱커를 피칭/플리핑으로 넣고 바닥에서 오래 흔들어 주세요."
      }
    },
    breakline: {
      fast: {
        title: "⚡ 브레이크라인 리액션 공략",
        desc: "배스가 1차 브레이크라인에 모여 있고 활성은 높습니다. 립리스·크랭크로 브레이크 턱을 긁거나 채터베이트로 엣지를 따라 빠르게 통과시켜 리액션 바이트를 유도하세요."
      },
      medium: {
        title: "🎯 브레이크라인 중속 탐색",
        desc: "연안과 수심의 경계(1.5~3m 턱)에 배스가 머무는 표준 패턴입니다. 딥크랭크 바닥 노킹, 서스펜딩 섀드 저킹, 카이저리그로 턱 위아래를 번갈아 탐색하세요."
      },
      slow: {
        title: "🛡️ 브레이크라인 바닥 피네스",
        desc: "배스가 브레이크 턱 바닥에 붙어 입을 닫은 상태입니다. 네꼬리그·프리리그·러버지그로 턱 경사면을 한 칸씩 끌며 스테이를 길게 가져가세요."
      }
    },
    deep: {
      fast: {
        title: "⚡ 딥 리액션 공략",
        desc: "깊은 수심대에 무리 지어 베이트를 쫓는 상황입니다. 딥크랭크 바닥 노킹과 메탈바이브 리프트앤폴로 연속적인 리액션을 주세요."
      },
      medium: {
        title: "🎯 딥 · 중층 회유 공략",
        desc: "본류 물골과 깊은 브레이크 주변 중층을 회유합니다. 중층 스트롤링·카이저리그로 회유층을 맞추고, 바닥권은 딥크랭크·메탈바이브로 확인하세요."
      },
      slow: {
        title: "🧊 딥 · 본류 물골 극피네스",
        desc: "저수온·갈수·고기압 등 악조건으로 배스가 본류 물골 바닥까지 내려갔습니다. 다운샷·메탈바이브 짧은 리프트앤폴·프리리그 드래깅으로 한 자리를 오래 두드리세요."
      }
    }
  },

  // state: 시뮬레이터 상태(수온·수위·시간대·바람·물색), live: WeatherEngine.currentData (없으면 null)
  synthesize(state, live) {
    const factors = [];
    let mood = 0;
    const add = (icon, text, effect) => {
      mood += effect;
      factors.push({ icon, text, effect });
    };

    // 1. 기압 (실시간 데이터가 있을 때만)
    if (live) {
      const d = live.pressureDiff3h || 0;
      if (d <= -1.5) add("📉", `기압 급하강 ${d.toFixed(1)}hPa`, 2);
      else if (d < -0.5) add("↘️", `기압 하강 ${d.toFixed(1)}hPa`, 1);
      else if (d >= 1.5) add("📈", `기압 급상승 +${d.toFixed(1)}hPa`, -2);
      else if (d >= 0.6) add("↗️", `기압 상승 +${d.toFixed(1)}hPa`, -1);
      else if (live.pressure > 1020) add("☀️", `고기압권 ${Math.round(live.pressure)}hPa`, -1);
      else add("⚖️", "기압 안정", 0);

      // 2. 기온 변화 (전일 동시간 대비)
      const t = live.tempDiff24h || 0;
      if (t <= -4) add("🥶", `기온 급강하 ${t.toFixed(1)}°C`, -1.5);
      else if (t <= -2) add("🌡️", `기온 하강 ${t.toFixed(1)}°C`, -0.5);
      else if (t >= 3 && state.temp < 22) add("🌡️", `기온 상승 +${t.toFixed(1)}°C`, 0.5);

      // 3. 광량
      if (live.cloudFactor === "overcast" || live.cloudFactor === "rain") add("☁️", "흐림·비 로우라이트", 1);
      else if (live.cloudFactor === "storm") add("⛈️", "뇌우·강한 비바람", -1.5);
      else if (live.cloudFactor === "snow") add("❄️", "눈", -1);
      else if (live.cloudFactor === "clear" && state.time === "midday") add("😎", "맑은 날 직사광", -1);
    }

    // 4. 수온
    const wt = state.temp;
    if (wt < 8) add("🧊", `수온 ${wt}°C 저수온`, -2);
    else if (wt < 10) add("🧊", `수온 ${wt}°C 저수온`, -1.5);
    else if (wt < 13) add("💧", `수온 ${wt}°C 다소 낮음`, -0.5);
    else if (wt < 16) add("💧", `수온 ${wt}°C 양호`, 0.5);
    else if (wt <= 23) add("💧", `수온 ${wt}°C 최적`, 1);
    else if (wt >= 28) add("🔥", `수온 ${wt}°C 고수온`, -1);
    else add("💧", `수온 ${wt}°C 다소 높음`, 0);

    // 5. 시간대
    if (state.time === "dawn_dusk") add("🌅", "피딩 시간대", 1);
    else if (state.time === "midday") add("☀️", "한낮 소강", -0.5);

    // 6. 바람
    if (state.wind === "moderate") add("💨", "잔파도", 0.5);
    else if (state.wind === "calm" && state.time === "midday") add("🪞", "한낮 장판", -0.5);
    else if (state.wind === "strong") add("🌬️", "강풍·바람받이 연안", 0);

    // 7. 수위 (실시간 수위 추세와 시뮬레이터 설정이 같을 때만 갈수기 정보 반영)
    const wl = live?.waterLevel;
    const severeLow = !!(wl && wl.isSevereLowWater && wl.trend === state.waterTrend);
    if (severeLow) add("🏜️", "갈수기 저수위", -1);
    else if (state.waterTrend === "rising") add("📈", "오름수위", 0.5);
    else if (state.waterTrend === "falling") add("📉", "내림수위 배수", -1);

    // === 활성도 → 템포 ===
    let activity = "neutral";
    if (mood >= 2) activity = "aggressive";
    else if (mood <= -1) activity = "negative";
    const speed = activity === "aggressive" ? "fast" : activity === "negative" ? "slow" : "medium";

    // === 위치(zone) 판단 ===
    let zone;
    let zoneReason;
    if (wt < 10) {
      zone = "deep";
      zoneReason = `수온 ${wt}°C로 수온이 안정적인 깊은 곳으로 이동`;
    } else if (severeLow) {
      zone = "deep";
      zoneReason = "갈수로 연안 커버가 드러나 본류 물골로 집결";
    } else if (state.waterTrend === "rising") {
      zone = "shallow";
      zoneReason = "오름수위로 새로 잠긴 연안 육초·커버로 진입";
    } else if (state.waterTrend === "falling") {
      zone = activity === "negative" ? "deep" : "breakline";
      zoneReason = activity === "negative" ? "배수 + 저활성으로 깊은 물골까지 후퇴" : "배수로 연안을 버리고 브레이크라인으로 후퇴";
    } else if (state.time === "dawn_dusk" || state.time === "night") {
      zone = "shallow";
      zoneReason = state.time === "night" ? "야간 연안 회유" : "피딩 시간대 연안 회유";
    } else if (wt >= 26) {
      zone = "shallow";
      zoneReason = "한낮 고수온 → 연안 헤비커버 그늘에 은신";
    } else if (activity === "aggressive") {
      zone = "shallow";
      zoneReason = "높은 활성으로 한낮에도 연안 사냥";
    } else {
      zone = "breakline";
      zoneReason = "한낮 평수위 → 브레이크라인·쉐이드에 대기";
    }

    const combo = this.COMBOS[zone][speed];

    // 상반된 신호 설명 (예: 오름수위인데 기압 급상승)
    let conflictNote = "";
    const pressureFactor = factors.find(f => f.text.startsWith("기압") || f.text.startsWith("고기압"));
    if (pressureFactor && pressureFactor.effect < 0 && zone === "shallow") {
      conflictNote = "수위·시간대는 연안을 가리키지만 기압 악화로 반응이 둔합니다 → 장소는 연안, 템포는 느리게.";
    } else if (pressureFactor && pressureFactor.effect > 0 && zone !== "shallow") {
      conflictNote = "배스 위치는 깊어졌지만 기압 하강으로 먹이 활동은 활발합니다 → 깊은 곳에서도 리액션 루어가 통합니다.";
    }

    const actColor = activity === "aggressive" ? "#22c55e" : activity === "negative" ? "#f59e0b" : "#38bdf8";
    const actLabel = activity === "aggressive" ? "고활성" : activity === "negative" ? "저활성" : "보통 활성";

    return {
      mood: Math.round(mood * 10) / 10,
      activity,
      actLabel,
      actColor,
      zone,
      zoneLabel: this.ZONE_LABELS[zone],
      zoneReason,
      speed,
      speedLabel: this.SPEED_LABELS[speed],
      title: combo.title,
      desc: combo.desc,
      conflictNote,
      factors
    };
  },

  // 루어별 전술 적합도 가중치 (랭킹 점수에 합산)
  lureFit(lure, tactic) {
    const p = this.LURE_PROFILE[lure.id];
    if (!p || !tactic) return { bonus: 0, fit: "good" };
    const order = ["fast", "medium", "slow"];
    let bonus = 0;

    if (p.speeds[0] === tactic.speed) bonus += 12;
    else if (p.speeds.includes(tactic.speed)) bonus += 5;
    else {
      const gap = Math.abs(order.indexOf(p.speeds[0]) - order.indexOf(tactic.speed));
      bonus -= gap >= 2 ? 14 : 4;
    }

    if (p.zones[0] === tactic.zone) bonus += 8;
    else if (p.zones.includes(tactic.zone)) bonus += 4;
    else bonus -= 6;

    const fit = bonus >= 15 ? "best" : bonus >= 5 ? "good" : "poor";
    return { bonus, fit };
  }
};
