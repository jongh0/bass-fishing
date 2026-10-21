// === 실시간 GPS 위치 · 기상 · 기압 · 농어촌공사(RAWRIS) 수위 · 월령 · 수온 추정 · 배스 활성도 엔진 ===

const WeatherEngine = {
  currentData: null,
  waterLevelsCache: null,

  // WMO Weather Code -> 한글 상태 및 아이콘
  getWeatherDesc(code) {
    if (code === 0) return { text: "맑음 (직사광)", icon: "☀️", cloudFactor: "clear" };
    if (code === 1 || code === 2) return { text: "구름 조금", icon: "🌤️", cloudFactor: "partly" };
    if (code === 3) return { text: "흐림 (로우라이트 호조건!)", icon: "☁️", cloudFactor: "overcast" };
    if (code >= 45 && code <= 48) return { text: "안개 (수면 경계심 하락)", icon: "🌫️", cloudFactor: "overcast" };
    if (code >= 51 && code <= 67) return { text: "비 / 이슬비 (피딩 활성!)", icon: "🌧️", cloudFactor: "rain" };
    if (code >= 71 && code <= 77) return { text: "눈 / 진눈깨비", icon: "❄️", cloudFactor: "snow" };
    if (code >= 80 && code <= 82) return { text: "소나기", icon: "🌦️", cloudFactor: "rain" };
    if (code >= 95) return { text: "뇌우 / 강한 비바람", icon: "⛈️", cloudFactor: "storm" };
    return { text: "보통", icon: "🌤️", cloudFactor: "partly" };
  },

  // 풍향 각도 -> 8방위 한글
  getWindDirText(deg) {
    const dirs = ["북풍", "북동풍", "동풍", "남동풍", "남풍", "남서풍", "서풍", "북서풍"];
    return dirs[Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 45) % 8];
  },

  // 음력 월령(Moon Phase) 및 물때 계산 (보름/그믐 대물 찬스 판별)
  getMoonPhase(date = new Date()) {
    const lp = 2551443;
    const now = date.getTime() / 1000;
    const newMoonRef = new Date("2024-01-11T11:57:00Z").getTime() / 1000;
    const phaseSec = ((now - newMoonRef) % lp + lp) % lp;
    const phaseRatio = phaseSec / lp;
    const lunarAge = Math.round(phaseRatio * 29.53 * 10) / 10;

    let label = "";
    let icon = "🌙";
    let bonus = 0;
    let tip = "";

    if (phaseRatio < 0.06 || phaseRatio > 0.94) {
      label = "삭 / 그믐 (어두운 밤 · 사리 물때)";
      icon = "🌑";
      bonus = 8;
      tip = "달빛이 없는 그믐/삭 전후는 대물 배스의 경계심이 낮아져 아침 첫피딩과 야간 블랙 컬러 탑워터·러버지그에 런커 확률이 급상승합니다.";
    } else if (phaseRatio >= 0.44 && phaseRatio <= 0.56) {
      label = "보름달 / 만월 (대사리 · 산란/야간 피딩)";
      icon = "🌕";
      bonus = 9;
      tip = "만월(보름) 전후 3일은 연중 배스의 야간 섭식과 봄철 산란 본능이 가장 강해지는 시기입니다. 해질녘~심야 피딩을 적극 노리세요.";
    } else if ((phaseRatio >= 0.20 && phaseRatio <= 0.30) || (phaseRatio >= 0.70 && phaseRatio <= 0.80)) {
      label = "상현달 / 하현달 (중물때)";
      icon = "🌓";
      bonus = 3;
      tip = "낮과 밤의 수중 활성 밸런스가 무난한 시기입니다. 일출·일몰 골든타임과 수온 상승 시간대에 집중하세요.";
    } else {
      label = `음력 약 ${Math.round(lunarAge)}일경`;
      icon = phaseRatio < 0.5 ? "🌒" : "🌖";
      bonus = 4;
      tip = "기본적인 일출·일몰 피딩 패턴과 기압 변화 추이에 맞춰 공략 수심층을 조절하세요.";
    }

    return { lunarAge, label, icon, bonus, tip };
  },

  // 현재 월(Month) 기반 계절 판별
  getSeasonFromDate(date = new Date()) {
    const m = date.getMonth() + 1;
    if (m >= 3 && m <= 5) return "spring";
    if (m >= 6 && m <= 8) return "summer";
    if (m >= 9 && m <= 11) return "autumn";
    return "winter";
  },

  // 기온 + 계절별 수체 열용량 보정으로 현실적인 추정 수온(Water Temp) 산출
  estimateWaterTemp(airTemp, date = new Date()) {
    const m = date.getMonth() + 1;
    const monthlyBaseWater = {
      1: 5, 2: 6, 3: 10, 4: 15, 5: 20, 6: 24,
      7: 27, 8: 28, 9: 24, 10: 18, 11: 12, 12: 7
    };
    const base = monthlyBaseWater[m] || 16;
    const estimated = Math.round(base * 0.55 + airTemp * 0.45);
    return Math.max(4, Math.min(30, estimated));
  },

  // 현재 시각과 일출/일몰 시각을 비교하여 출조 시간대(dawn_dusk / midday / night) 판별
  determineTimeOfDay(nowDate, sunriseStr, sunsetStr) {
    const hour = nowDate.getHours() + nowDate.getMinutes() / 60;
    let srHour = 6.2;
    let ssHour = 18.2;

    if (sunriseStr && sunsetStr) {
      const sr = new Date(sunriseStr);
      const ss = new Date(sunsetStr);
      srHour = sr.getHours() + sr.getMinutes() / 60;
      ssHour = ss.getHours() + ss.getMinutes() / 60;
    }

    if ((hour >= srHour - 1.0 && hour <= srHour + 2.5) || (hour >= ssHour - 2.0 && hour <= ssHour + 1.0)) {
      return "dawn_dusk";
    }
    if (hour > srHour + 2.5 && hour < ssHour - 2.0) {
      return "midday";
    }
    return "night";
  },

  // 풍속(m/s) -> 바람 상태(calm / moderate / strong)
  determineWindState(windSpeedMs) {
    if (windSpeedMs < 2.0) return "calm";
    if (windSpeedMs < 5.2) return "moderate";
    return "strong";
  },

  // GPS 위경도 기준 가장 가까운 RAWRIS 수위 계측 포인트 찾기
  findNearestEquipSpot(lat, lon) {
    let bestSpot = null;
    let minDist = Infinity;
    for (const s of KOREA_SPOTS) {
      if (!s.equipNo || s.lat == null || s.lon == null) continue;
      const dLat = s.lat - lat;
      const dLon = s.lon - lon;
      const dist = Math.sqrt(dLat * dLat + dLon * dLon);
      if (dist < minDist) {
        minDist = dist;
        bestSpot = s;
      }
    }
    return bestSpot || KOREA_SPOTS.find(s => s.id === "asan") || KOREA_SPOTS[1]; // 기본 아산호
  },

  // 한국농어촌공사(RAWRIS) 수위 데이터 로드 및 오름/내림수위 전술 분석
  async fetchWaterLevelData(equipNo) {
    if (!equipNo) return null;

    let raw = null;

    // 0. 내장 스크립트(js/water-levels-data.js -> window.RAWRIS_WATER_LEVELS)에서 즉시 기본 로드 (PC 캐시/CORS/방화벽 무관 100% 보장)
    if (typeof window !== "undefined" && window.RAWRIS_WATER_LEVELS?.equips?.[equipNo]) {
      raw = window.RAWRIS_WATER_LEVELS.equips[equipNo];
    }

    // 1. 저장소 내 최신 동기화 JSON(data/water-levels.json) 로드 시도
    try {
      if (!this.waterLevelsCache) {
        const res = await fetch(`./data/water-levels.json?t=${Date.now()}`);
        if (res.ok) {
          const json = await res.json();
          if (json?.equips && Object.keys(json.equips).length > 0) {
            this.waterLevelsCache = json;
          }
        }
      }
      if (this.waterLevelsCache?.equips?.[equipNo]) {
        raw = this.waterLevelsCache.equips[equipNo];
      }
    } catch (e) {
      // ignore
    }

    // 2. 브라우저 직접 호출 시도 (CORS 허용 환경일 경우 최신 10분 데이터 즉시 덮어쓰기)
    try {
      const directUrl = `https://rawris-am.ekr.or.kr/wrms/query/json?qid=rawris.wrms.gis.popup.view_info_reservoir&db_type=undefined&equip_no=${equipNo}`;
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 1800);
      const resLive = await fetch(directUrl, { signal: ctrl.signal });
      clearTimeout(timer);
      if (resLive.ok) {
        const arr = await resLive.json();
        if (arr && arr[0] && arr[0].equip_name) raw = arr[0];
      }
    } catch (e) {
      // CORS 제한 시 0/1번 스냅샷 데이터 사용
    }

    if (!raw) return null;

    const nowRate = parseFloat(raw.now_rate || 0);
    const ydayRate = parseFloat(raw.yday_rate || 0);
    const norRate = parseFloat(raw.nor_rate || 0);
    const nowWlvl = parseFloat(raw.now_wlvl || 0);
    const ydayWlvl = parseFloat(raw.yday_wlvl || 0);
    const fullWlvl = parseFloat(raw.r_level_full || 0);
    const minWlvl = parseFloat(raw.r_level_defense || 0);
    const floodWlvl = parseFloat(raw.r_level_flood || 0);
    const altitudeWlvl = parseFloat(raw.r_altitude || 0);
    const dischargeNow = parseFloat(raw.t_discharge_volume || 0);
    const dischargeYday = parseFloat(raw.y_discharge_volume || 0);

    const diffWlvl = Math.round((nowWlvl - ydayWlvl) * 100) / 100;
    const diffRate = Math.round((nowRate - ydayRate) * 10) / 10;
    const diffNorRate = norRate > 0 ? Math.round((nowRate - norRate) * 10) / 10 : 0;

    let trend = "stable"; // rising | stable | falling
    let trendLabel = "⚖️ 평수위 / 수위 안정";
    let trendBadgeColor = "#38bdf8";
    let waterTactic = "";
    let biteBonus = 0;

    // 오름수위/내림수위 판별 기준 (전일 대비 변화 + 평년 저수율 대비 상태 종합)
    // - 극심한 갈수기(저수율 45% 이하 또는 평년 대비 -15%p 이하): 전일 대비 소폭 상승해도 연안 육초가 잠기지 않으므로 오름수위 제외
    const isSevereLowWater = nowRate <= 45 || (norRate > 0 && diffNorRate <= -15);
    // - 오름수위 조건: 갈수기가 아니면서(최소 저수율 55% 이상 & 평년 대비 -10%p 이상),
    //   (1) 전일 대비 수위 +0.03m 또는 저수율 +0.5% 이상 상승했거나
    //   (2) 평년 대비 +3.0%p 이상 높은 풍수위이면서 수위가 유지/상승(>= 0) 중일 때
    const isRisingCondition =
      !isSevereLowWater &&
      nowRate >= 55 &&
      (norRate === 0 || diffNorRate >= -10) &&
      (diffWlvl >= 0.03 || diffRate >= 0.5 || (norRate > 0 && diffNorRate >= 3.0 && diffWlvl >= 0));

    // - 내림수위/배수 조건:
    //   (1) 전일 대비 수위 -0.02m 이하 또는 저수율 -0.4% 이하 하락, 또는 방류 중이거나
    //   (2) 평년 대비 -12.0%p 이하(또는 절대 저수율 45% 이하)이면서 전일 대비 유의미한 반등(+1.5% 이상)이 없는 갈수·배수 상태
    const isFallingCondition =
      diffWlvl <= -0.02 ||
      diffRate <= -0.4 ||
      dischargeNow > 0 ||
      (isSevereLowWater && diffRate < 1.5);

    if (isRisingCondition) {
      trend = "rising";
      trendLabel = `📈 오름수위 (${diffWlvl >= 0 ? "+" : ""}${diffWlvl.toFixed(2)}m)`;
      trendBadgeColor = "#22c55e";
      biteBonus = 7;
      waterTactic = "적정 저수율을 유지하며 수위가 오르는 '오름수위' 찬스입니다! 새롭게 물에 잠긴 연안 육초대·갈대·수초 엣지로 베이트피쉬와 빅배스가 대거 올라붙습니다. 쉘로우 무빙 루어(스피너베이트, 채터베이트, 쉘로우 크랭크)와 프로그/노싱커로 연안을 적극 공략하세요!";
    } else if (isFallingCondition) {
      trend = "falling";
      if (isSevereLowWater && diffWlvl > -0.02 && diffRate > -0.4) {
        trendLabel = `📉 갈수기 저수위 (평년비 ${diffNorRate.toFixed(1)}%p)`;
        trendBadgeColor = "#f59e0b";
        biteBonus = -6;
        waterTactic = `전일 대비 소폭 수위 유입(${diffWlvl >= 0 ? "+" : ""}${diffWlvl.toFixed(2)}m)이 있으나, 현재 저수율 ${nowRate.toFixed(1)}%(평년 ${norRate.toFixed(1)}%)로 연안 커버가 육상에 드러난 갈수기 저수위 상태입니다. 얕은 연안 오름수위 패턴 대신 본류권 물골(채널), 급심 브레이크라인, 새물유입구(인렛)를 프리리그·메탈바이브·다운샷으로 공략하세요.`;
      } else {
        trendLabel = `📉 내림수위 (${diffWlvl.toFixed(2)}m)`;
        trendBadgeColor = "#f59e0b";
        biteBonus = -8;
        waterTactic = "전일 대비 수위가 빠지는 '배수(내림수위)' 진행 중입니다. 배스가 수위 저하에 경계심을 느끼고 얕은 연안에서 빠져나와 1차 브레이크라인 턱, 수몰나무 깊은 그늘, 본류 물골(채널)로 후퇴합니다. 다운샷·네꼬리그·프리리그 등 슬로우 피네스 채비나 새물유입구(인렛) 위주로 공략하세요.";
      }
    } else {
      trend = "stable";
      trendLabel = `⚖️ 평수위 (${diffWlvl >= 0 ? "+" : ""}${diffWlvl.toFixed(2)}m)`;
      trendBadgeColor = "#38bdf8";
      biteBonus = 0;
      if (nowRate <= 58 || (norRate > 0 && diffNorRate <= -8)) {
        waterTactic = `현재 저수율 ${nowRate.toFixed(1)}%(평년 ${norRate.toFixed(1)}%)로 다소 낮은 수위에서 소폭 오르내리며 안정화 중입니다. 연안 수초대보다는 1차 브레이크라인 경계석과 물골 주변을 프리리그·섀드웜·크랭크로 탐색하세요.`;
      } else if (nowRate >= 85) {
        waterTactic = `현재 저수율 ${nowRate.toFixed(1)}%로 풍부한 만수위권 안정세입니다. 연안 수초와 수몰나무 커버까지 물이 차 있어 커버 피칭(러버지그, 프리리그)과 연안 패러럴 캐스팅이 모두 위력적입니다.`;
      } else {
        waterTactic = `수위 변동 없이 안정적인 컨디션(${nowRate.toFixed(1)}%)입니다. 시간대별 정석 패턴(아침/저녁 연안 피딩, 한낮 브레이크라인/쉐이드)으로 접근하세요.`;
      }
    }

    return {
      equipNo,
      equipName: String(raw.equip_name || "").replace(/\s*\(.*?\)/g, "").trim(),
      headName: raw.buseo_head_name,
      branchName: raw.buseo_branch_name,
      address: `${raw.equip_addr1 || ""} ${raw.equip_addr2 || ""}`.replace("전남광주통합특별시", "전라남도").trim(),
      nowDate: raw.now_date,
      ydayDate: raw.yday_date,
      nowRate,
      ydayRate,
      norRate,
      nowWlvl,
      ydayWlvl,
      fullWlvl,
      minWlvl,
      floodWlvl,
      altitudeWlvl,
      totalStorage: raw.r_total_storage,
      effecStorage: raw.r_effec_storage,
      areaWatershed: raw.area_watershed,
      nowVow: raw.now_vow,
      ydayVow: raw.yday_vow,
      dischargeNow,
      dischargeYday,
      diffWlvl,
      diffRate,
      trend,
      trendLabel,
      trendBadgeColor,
      waterTactic,
      biteBonus
    };
  },

  // 기압(hPa) 및 최근 3시간 기압 변화량 + 날씨 + 수온 + 시간대 + 수위변동을 종합한 배스 활성도 지수(Bite Index)
  analyzeBiteIndex({ pressure, pressureDiff3h, weatherCode, windSpeedMs, waterTemp, timeOfDay, moonBonus, waterLevelBonus = 0 }) {
    // 기본 중립 점수를 48점으로 설정하여 평범한 날에는 50~65점(보통), 악조건에는 30~45점(터프), 호조건이 겹칠 때만 70~85점+가 나오도록 변별력 강화
    let score = 48;
    let pressureStatus = "";
    let pressureTactic = "";

    // 1. 기압 및 3시간 기압 변화 추이 (-14 ~ +12점)
    if (pressureDiff3h <= -1.5) {
      score += 12;
      pressureStatus = `📉 기압 하락세 (${pressureDiff3h.toFixed(1)}hPa / 3h) — 피딩 최고조!`;
      pressureTactic = "저기압 접근으로 배스의 부레 압력이 편안해져 쉘로우와 중층으로 떠올라 적극 사냥합니다. 스피너베이트·채터베이트·크랭크 등 빠른 무빙 루어로 넓게 훑으세요!";
    } else if (pressureDiff3h < -0.5) {
      score += 7;
      pressureStatus = `↘️ 완만한 기압 하강 (${pressureDiff3h.toFixed(1)}hPa / 3h) — 입질 활발`;
      pressureTactic = "기압이 서서히 낮아지며 경계심이 풀리는 좋은 흐름입니다. 연안 브레이크라인과 수초 엣지에서 무빙과 소프트 스위밍 모두 잘 먹힙니다.";
    } else if (pressureDiff3h >= 1.5) {
      score -= 14;
      pressureStatus = `📈 급격한 고기압 상승 (+${pressureDiff3h.toFixed(1)}hPa / 3h) — 터프 컨디션`;
      pressureTactic = "기압이 빠르게 치솟아 배스가 부레 팽창감을 느끼고 수몰나무·바위 틈새 깊숙이 박혀 입을 닫습니다. 네꼬리그·다운샷·러버지그로 스트럭처 내부를 아주 천천히 노리세요.";
    } else if (pressureDiff3h >= 0.6) {
      score -= 6;
      pressureStatus = `↗️ 기압 상승세 (+${pressureDiff3h.toFixed(1)}hPa / 3h) — 경계심 증가`;
      pressureTactic = "기압이 오르며 배스가 중층 회유를 줄이고 스트럭처 그늘이나 바닥 가까이 붙기 시작합니다. 리트리브 속도를 늦추고 스테이 시간을 늘리세요.";
    } else if (pressure > 1020) {
      score -= 7;
      pressureStatus = `☀️ 높은 고기압권 (${Math.round(pressure)}hPa) — 쉐이드/바닥 밀착`;
      pressureTactic = "전형적인 맑은 고기압 패턴입니다. 오픈워터 회유보다 그늘(쉐이드)과 바닥 돌 틈에 붙어 있으므로 피네스 낚시나 바텀 태핑 리액션을 유도하세요.";
    } else {
      score += 0;
      pressureStatus = `⚖️ 기압 안정세 (${Math.round(pressure)}hPa, ${pressureDiff3h >= 0 ? "+" : ""}${pressureDiff3h.toFixed(1)}hPa)`;
      pressureTactic = "기압 변동이 적어 배스가 표준적인 시간대별 회유 루트를 따릅니다. 피딩 타임에는 연안, 한낮에는 브레이크라인을 공략하세요.";
    }

    // 2. 일조량 및 날씨 조건 (-15 ~ +8점)
    const wInfo = this.getWeatherDesc(weatherCode);
    if (wInfo.cloudFactor === "overcast" || wInfo.cloudFactor === "rain") {
      score += 8; // 로우라이트 호조건
    } else if (wInfo.cloudFactor === "clear" && timeOfDay === "midday") {
      score -= 7; // 맑은 날 한낮 직사광선은 배스 경계심 상승
    } else if (wInfo.cloudFactor === "snow") {
      score -= 10;
    } else if (wInfo.cloudFactor === "storm") {
      score -= 15;
    }

    // 3. 수온 활성 구간 (-16 ~ +10점)
    if (waterTemp >= 16 && waterTemp <= 23) {
      score += 10; // 최적 수온
    } else if ((waterTemp >= 13 && waterTemp < 16) || (waterTemp > 23 && waterTemp <= 26)) {
      score += 4;
    } else if ((waterTemp >= 10 && waterTemp < 13) || (waterTemp > 26 && waterTemp <= 28)) {
      score -= 3;
    } else if (waterTemp < 10) {
      score -= 14; // 저수온기 활성 저하
    } else if (waterTemp > 28) {
      score -= 10; // 고수온기 용존산소 부족
    }

    // 4. 출조 시간대 (-5 ~ +9점)
    if (timeOfDay === "dawn_dusk") {
      score += 9; // 일출·일몰 피딩 골든타임
    } else if (timeOfDay === "midday") {
      score -= 5; // 한낮 소강상태
    } else if (timeOfDay === "night") {
      score += 1;
    }

    // 5. 바람 및 수면 파도 (-10 ~ +4점)
    if (windSpeedMs >= 1.8 && windSpeedMs <= 4.2) {
      score += 4; // 적당한 잔파도는 경계심 완화 및 플랑크톤 활성화
    } else if (windSpeedMs < 0.8 && timeOfDay === "midday") {
      score -= 3; // 한낮 완전 장판은 프레셔 증가
    } else if (windSpeedMs > 5.5 && windSpeedMs <= 7.0) {
      score -= 4;
    } else if (windSpeedMs > 7.0) {
      score -= 10;
    }

    // 6. 월령(물때) 및 수위 변동 보너스 합산
    // 사리(삭/그믐/보름)에만 +3~4점, 평일은 0점
    const moonAdj = (moonBonus || 4) >= 8 ? 4 : 0;
    score += moonAdj;
    score += waterLevelBonus;

    const finalScore = Math.max(20, Math.min(96, Math.round(score)));
    let grade = "보통";
    let color = "#38bdf8";
    if (finalScore >= 78) {
      grade = "🔥 폭발적 입질";
      color = "#22c55e";
    } else if (finalScore >= 64) {
      grade = "👍 활성도 좋음";
      color = "#4ade80";
    } else if (finalScore < 48) {
      grade = "🛡️ 저활성 터프";
      color = "#f59e0b";
    }

    return {
      score: finalScore,
      grade,
      color,
      pressureStatus,
      pressureTactic
    };
  },

  // 역지오코딩: 위경도 -> 한국어 지역명
  async fetchLocationName(lat, lon) {
    try {
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=ko`
      );
      if (!res.ok) throw new Error("Geocode error");
      const data = await res.json();
      const city = data.principalSubdivision || "";
      const locality = data.locality || data.city || "";
      return `${city} ${locality}`.trim() || `위도 ${lat.toFixed(2)}, 경도 ${lon.toFixed(2)}`;
    } catch (e) {
      return `위도 ${lat.toFixed(3)}, 경도 ${lon.toFixed(3)}`;
    }
  },

  // Open-Meteo 실시간 날씨·기압·일출일몰 API + 농어촌공사(RAWRIS) 실시간 수위 통합 조회
  async fetchLiveWeather(lat, lon, customSpotName = null, equipNo = null) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=surface_pressure&daily=sunrise,sunset&timezone=Asia%2FSeoul&forecast_days=1`;

    const [res, waterLevel] = await Promise.all([
      fetch(url),
      this.fetchWaterLevelData(equipNo)
    ]);
    if (!res.ok) throw new Error("날씨 데이터를 불러오지 못했습니다.");
    const data = await res.json();

    const cur = data.current;
    const airTemp = Math.round(cur.temperature_2m * 10) / 10;
    const apparentTemp = Math.round(cur.apparent_temperature * 10) / 10;
    const windSpeedMs = Math.round((cur.wind_speed_10m / 3.6) * 10) / 10;
    const windDir = this.getWindDirText(cur.wind_direction_10m);
    const pressure = cur.surface_pressure;

    const nowHourIndex = new Date().getHours();
    let pressureDiff3h = 0;
    if (data.hourly && data.hourly.surface_pressure && nowHourIndex >= 3) {
      const pNow = data.hourly.surface_pressure[nowHourIndex] || pressure;
      const p3hAgo = data.hourly.surface_pressure[nowHourIndex - 3] || pressure;
      pressureDiff3h = Math.round((pNow - p3hAgo) * 10) / 10;
    }

    const sunriseRaw = data.daily?.sunrise?.[0] || null;
    const sunsetRaw = data.daily?.sunset?.[0] || null;
    const formatTime = (iso) => {
      if (!iso) return "--:--";
      const d = new Date(iso);
      return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
    };

    const now = new Date();
    const season = this.getSeasonFromDate(now);
    const estimatedWaterTemp = this.estimateWaterTemp(airTemp, now);
    const timeOfDay = this.determineTimeOfDay(now, sunriseRaw, sunsetRaw);
    const windState = this.determineWindState(windSpeedMs);
    const weatherDesc = this.getWeatherDesc(cur.weather_code);
    const moon = this.getMoonPhase(now);

    const locationName = customSpotName || (await this.fetchLocationName(lat, lon));

    const biteAnalysis = this.analyzeBiteIndex({
      pressure,
      pressureDiff3h,
      weatherCode: cur.weather_code,
      windSpeedMs,
      waterTemp: estimatedWaterTemp,
      timeOfDay,
      moonBonus: moon.bonus,
      waterLevelBonus: waterLevel ? waterLevel.biteBonus : 0
    });

    this.currentData = {
      lat,
      lon,
      locationName,
      updatedAt: `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`,
      airTemp,
      apparentTemp,
      estimatedWaterTemp,
      windSpeedMs,
      windDir,
      windState,
      pressure: Math.round(pressure * 10) / 10,
      pressureDiff3h,
      weatherCode: cur.weather_code,
      weatherText: weatherDesc.text,
      weatherIcon: weatherDesc.icon,
      precipitation: cur.precipitation,
      sunrise: formatTime(sunriseRaw),
      sunset: formatTime(sunsetRaw),
      season,
      timeOfDay,
      moon,
      waterLevel,
      biteAnalysis
    };

    return this.currentData;
  }
};
