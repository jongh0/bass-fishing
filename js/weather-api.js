// === 실시간 GPS 위치 · 기상 · 기압 · 월령 · 수온 추정 · 배스 활성도 엔진 ===

const WeatherEngine = {
  currentData: null,

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
    const lp = 2551443; // 삭망월 주기(초)
    const now = date.getTime() / 1000;
    const newMoonRef = new Date("2024-01-11T11:57:00Z").getTime() / 1000;
    const phaseSec = ((now - newMoonRef) % lp + lp) % lp;
    const phaseRatio = phaseSec / lp; // 0.0 ~ 1.0
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
    // 계절별 한국 저수지/호수 평균 기저 수온
    const monthlyBaseWater = {
      1: 5, 2: 6, 3: 10, 4: 15, 5: 20, 6: 24,
      7: 27, 8: 28, 9: 24, 10: 18, 11: 12, 12: 7
    };
    const base = monthlyBaseWater[m] || 16;
    // 물은 공기보다 비열이 커서 기온 변화의 약 45%만 따라가며 계절 기저 수온과 수렴함
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

    // 일출 전 1시간 ~ 일출 후 2.5시간 OR 일몰 전 2시간 ~ 일몰 후 1시간 = 새벽/해질녘 골든타임
    if ((hour >= srHour - 1.0 && hour <= srHour + 2.5) || (hour >= ssHour - 2.0 && hour <= ssHour + 1.0)) {
      return "dawn_dusk";
    }
    // 일출 후 2.5시간 ~ 일몰 전 2시간 = 한낮
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

  // 기압(hPa) 및 최근 3시간 기압 변화량 + 날씨 + 수온 + 시간대를 종합한 배스 활성도 지수(Bite Index)
  analyzeBiteIndex({ pressure, pressureDiff3h, weatherCode, windSpeedMs, waterTemp, timeOfDay, moonBonus }) {
    let score = 55;
    let pressureStatus = "";
    let pressureTactic = "";

    // 1. 기압 변화 트렌드 분석 (배스 부레 압력 및 중층 부상 여부)
    if (pressureDiff3h <= -1.5) {
      score += 16;
      pressureStatus = `📉 기압 하락세 (${pressureDiff3h.toFixed(1)}hPa / 3h) — 피딩 최고조!`;
      pressureTactic = "저기압 접근으로 배스의 부레 압력이 편안해져 쉘로우와 중층으로 떠올라 적극 사냥합니다. 스피너베이트·채터베이트·크랭크 등 빠른 무빙 루어로 넓게 훑으세요!";
    } else if (pressureDiff3h < -0.4) {
      score += 10;
      pressureStatus = `↘️ 완만한 기압 하강 (${pressureDiff3h.toFixed(1)}hPa / 3h) — 입질 활발`;
      pressureTactic = "기압이 서서히 낮아지며 경계심이 풀리는 좋은 흐름입니다. 연안 브레이크라인과 수초 엣지에서 무빙과 소프트 스위밍 모두 잘 먹힙니다.";
    } else if (pressureDiff3h >= 1.8) {
      score -= 14;
      pressureStatus = `📈 급격한 고기압 상승 (+${pressureDiff3h.toFixed(1)}hPa / 3h) — 터프 컨디션`;
      pressureTactic = "기압이 빠르게 치솟아 배스가 부레 팽창감을 느끼고 수몰나무·바위 틈새 깊숙이 박혀 입을 닫습니다. 네꼬리그·다운샷·러버지그로 스트럭처 내부를 아주 천천히 노리세요.";
    } else if (pressure > 1022) {
      score -= 6;
      pressureStatus = `☀️ 높은 고기압권 (${Math.round(pressure)}hPa) — 쉐이드/바닥 밀착`;
      pressureTactic = "전형적인 맑은 고기압 패턴입니다. 오픈워터 회유보다 그늘(쉐이드)과 바닥 돌 틈에 붙어 있으므로 피네스 낚시나 바텀 태핑 리액션을 유도하세요.";
    } else {
      score += 4;
      pressureStatus = `⚖️ 기압 안정세 (${Math.round(pressure)}hPa, ${pressureDiff3h >= 0 ? "+" : ""}${pressureDiff3h.toFixed(1)}hPa)`;
      pressureTactic = "기압 변동이 적어 배스가 표준적인 시간대별 회유 루트를 따릅니다. 피딩 타임에는 연안, 한낮에는 브레이크라인을 공략하세요.";
    }

    // 2. 날씨(조도) 보정
    const wInfo = this.getWeatherDesc(weatherCode);
    if (wInfo.cloudFactor === "overcast" || wInfo.cloudFactor === "rain") {
      score += 10; // 흐리거나 약한 비는 조도가 낮아져 하루 종일 피딩 가능
    } else if (wInfo.cloudFactor === "storm") {
      score -= 15;
    }

    // 3. 수온 활성도 보정 (15~24도 최적)
    if (waterTemp >= 15 && waterTemp <= 24) {
      score += 12;
    } else if (waterTemp >= 11 && waterTemp <= 27) {
      score += 5;
    } else if (waterTemp <= 8) {
      score -= 12;
    }

    // 4. 시간대 보정
    if (timeOfDay === "dawn_dusk") score += 10;
    else if (timeOfDay === "night") score += 3;

    // 5. 적당한 바람(잔파도)은 수면 경계심을 낮추고 용존산소를 높임
    if (windSpeedMs >= 1.8 && windSpeedMs <= 4.5) score += 6;
    else if (windSpeedMs > 7.0) score -= 10;

    // 6. 월령 보너스
    score += Math.round((moonBonus || 4) * 0.5);

    const finalScore = Math.max(20, Math.min(98, Math.round(score)));
    let grade = "보통 (Standard)";
    let color = "#38bdf8";
    if (finalScore >= 82) {
      grade = "🔥 폭발적 입질 (Golden Bite!)";
      color = "#22c55e";
    } else if (finalScore >= 68) {
      grade = "👍 활성도 좋음 (Active)";
      color = "#4ade80";
    } else if (finalScore < 48) {
      grade = "🛡️ 저활성 터프 (Finesse 필수)";
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

  // Open-Meteo 실시간 날씨·기압·일출일몰 API 조회
  async fetchLiveWeather(lat, lon, customSpotName = null) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=surface_pressure&daily=sunrise,sunset&timezone=Asia%2FSeoul&forecast_days=1`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("날씨 데이터를 불러오지 못했습니다.");
    const data = await res.json();

    const cur = data.current;
    const airTemp = Math.round(cur.temperature_2m * 10) / 10;
    const apparentTemp = Math.round(cur.apparent_temperature * 10) / 10;
    // Open-Meteo 기본 풍속 단위는 km/h이므로 m/s로 변환 (나누기 3.6)
    const windSpeedMs = Math.round((cur.wind_speed_10m / 3.6) * 10) / 10;
    const windDir = this.getWindDirText(cur.wind_direction_10m);
    const pressure = cur.surface_pressure;

    // 최근 3시간 기압 변화량 계산
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
      moonBonus: moon.bonus
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
      biteAnalysis
    };

    return this.currentData;
  }
};
