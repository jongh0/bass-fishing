// === 메인 애플리케이션 컨트롤러 (스코어링 엔진 · 2D 캔버스 · 실시간 날씨 동기화 · 조행일지) ===

let state = {
  season: "autumn",
  time: "dawn_dusk",
  temp: 16,
  wind: "moderate",
  clarity: "stained",
  struct: "rock_slope",
  catFilter: "ALL",
  tackleFilter: "ALL",
  selectedLureId: "chatterbait",
  selectedSpotId: "gps",
  activeTab: "tab-simulator",
  mobileControlsOpen: false
};

const seasonPresets = {
  spring: { temp: 15, wind: "moderate", clarity: "stained", struct: "rock_slope", label: "봄 (산란기 14~18°C)" },
  summer: { temp: 25, wind: "calm", clarity: "stained", struct: "shallow_weed", label: "여름 (고수온 23~28°C)" },
  autumn: { temp: 16, wind: "moderate", clarity: "stained", struct: "rock_slope", label: "가을 (턴오버/피딩 13~18°C)" },
  winter: { temp: 7, wind: "calm", clarity: "clear", struct: "deep_open", label: "겨울 (저수온 4~9°C)" }
};

const timeLabels = {
  dawn_dusk: "🌅 새벽/해질녘 (피딩)",
  midday: "☀️ 한낮 (직사광/쉐이드)",
  night: "🌙 야간 (나이트 게임)"
};

const windLabels = {
  calm: "장판 / 무풍",
  moderate: "보통 (잔파도)",
  strong: "강풍 / 파도"
};

const clarityLabels = {
  clear: "맑음 (Clear)",
  stained: "보통 (녹조/수초물)",
  muddy: "탁수 (흙탕물)"
};

const structLabels = {
  shallow_weed: "수초 / 연밭 엣지",
  rock_slope: "석축 / 브레이크라인",
  heavy_cover: "수몰나무 / 헤비커버",
  deep_open: "오픈워터 / 딥채널"
};

// === 1. 루어 매칭 스코어 계산 엔진 (수온 + 계절 + 시간대 + 지형 + 바람 + 물색 + BFS) ===
function computeScore(lure) {
  let score = 46;

  // 1) 수온 매칭
  const [minT, maxT] = lure.tempRange;
  if (state.temp >= minT && state.temp <= maxT) {
    const mid = (minT + maxT) / 2;
    const dist = Math.abs(state.temp - mid);
    const span = Math.max(1, (maxT - minT) / 2);
    score += 21 - Math.round((dist / span) * 6);
  } else {
    const diff = state.temp < minT ? (minT - state.temp) : (state.temp - maxT);
    score -= Math.min(26, diff * 3.4);
  }

  // 2) 계절 매칭
  if (lure.bestSeasons.includes(state.season)) {
    score += 7;
  }

  // 3) 시간대 매칭
  if (lure.bestTime[0] === state.time) {
    score += 11;
  } else if (lure.bestTime.includes(state.time)) {
    score += 6;
  } else {
    score -= 8;
  }

  // 4) 지형 매칭
  if (lure.bestStruct[0] === state.struct) {
    score += 12;
  } else if (lure.bestStruct.includes(state.struct)) {
    score += 6;
  } else {
    score -= 6;
  }

  // 5) 바람 매칭
  if (lure.bestWind.includes(state.wind)) {
    score += 6;
  } else {
    score -= 5;
  }

  // 6) 물색(Clarity) 매칭 (NEW)
  if (lure.bestClarity && lure.bestClarity[0] === state.clarity) {
    score += 7;
  } else if (lure.bestClarity && lure.bestClarity.includes(state.clarity)) {
    score += 3;
  } else {
    score -= 5;
  }

  // 7) BFS 피네스 보너스
  if (state.tackleFilter === "BFS" && lure.bfsFriendly) {
    score += 3;
  }

  return Math.max(15, Math.min(99, Math.round(score)));
}

function getFilteredAndRankedLures() {
  return LURES
    .filter(l => state.catFilter === "ALL" || l.category === state.catFilter)
    .filter(l => state.tackleFilter === "ALL" || l.bfsFriendly)
    .map(l => ({ ...l, score: computeScore(l) }))
    .sort((a, b) => b.score - a.score);
}

// === 2. 컨트롤 버튼 활성화 상태 동기화 ===
function syncControlButtons() {
  document.getElementById("tempSlider").value = state.temp;

  const toggleGroup = (selector, attr, val) => {
    document.querySelectorAll(`${selector} .btn-toggle`).forEach(b => {
      b.classList.toggle("active", b.getAttribute(attr) === val);
    });
  };

  toggleGroup("#seasonGroup", "data-season", state.season);
  toggleGroup("#timeGroup", "data-time", state.time);
  toggleGroup("#windGroup", "data-wind", state.wind);
  toggleGroup("#clarityGroup", "data-clarity", state.clarity);
  toggleGroup("#structGroup", "data-struct", state.struct);
  toggleGroup("#catFilterGroup", "data-cat", state.catFilter);
  toggleGroup("#tackleGroup", "data-tackle", state.tackleFilter);
}

// === 3. 메인 UI 렌더링 ===
function renderUI() {
  syncControlButtons();

  document.getElementById("seasonLabel").textContent = seasonPresets[state.season].label;
  document.getElementById("timeLabel").textContent = timeLabels[state.time];
  document.getElementById("tempLabel").textContent = `${state.temp}°C`;
  document.getElementById("windLabel").textContent = windLabels[state.wind];
  document.getElementById("clarityLabel").textContent = clarityLabels[state.clarity];
  document.getElementById("structLabel").textContent = structLabels[state.struct];

  // 모바일 요약 바 텍스트 업데이트
  const mobileSummaryEl = document.getElementById("mobileControlSummary");
  if (mobileSummaryEl) {
    mobileSummaryEl.textContent = `${state.temp}°C · ${timeLabels[state.time].split(" ")[1]} · ${clarityLabels[state.clarity].split(" ")[0]} · ${structLabels[state.struct].split(" ")[0]}`;
  }

  const ranked = getFilteredAndRankedLures();
  document.getElementById("tackleLabel").textContent =
    state.tackleFilter === "BFS" ? `⚡ BFS 전용 (${ranked.length}종)` : `전체 (${ranked.length}종)`;
  document.getElementById("resultCountLabel").textContent = `총 ${ranked.length}개 루어 분석됨`;

  if (!ranked.some(l => l.id === state.selectedLureId) && ranked.length > 0) {
    state.selectedLureId = ranked[0].id;
  }

  const listEl = document.getElementById("lureListContainer");
  listEl.innerHTML = "";

  ranked.forEach((lure, idx) => {
    const isSelected = lure.id === state.selectedLureId;
    const rankClass = idx === 0 ? "rank-1" : idx === 1 ? "rank-2" : idx === 2 ? "rank-3" : "";
    const catTagClass = lure.category === "HARD" ? "tag-hard" : lure.category === "WIRE" ? "tag-wire" : "tag-soft";
    const barColor = lure.score >= 85 ? "#22c55e" : lure.score >= 70 ? "#38bdf8" : lure.score >= 55 ? "#f59e0b" : "#64748b";

    const item = document.createElement("div");
    item.className = `lure-item ${rankClass} ${isSelected ? "selected" : ""}`;
    item.onclick = () => {
      state.selectedLureId = lure.id;
      renderUI();
      if (window.innerWidth <= 768) {
        document.getElementById("waterCanvas").scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    item.innerHTML = `
      <div class="lure-row-top">
        <div class="lure-name-wrap">
          <span class="rank-num">${idx + 1}</span>
          <span class="lure-title">${lure.name}</span>
          <span class="mini-tag ${catTagClass}">${lure.catLabel}</span>
          ${lure.bfsFriendly ? '<span class="mini-tag tag-bfs">BFS 호환</span>' : ''}
        </div>
      </div>
      <div class="score-bar-wrap">
        <div class="score-track">
          <div class="score-fill" style="width:${lure.score}%; background:${barColor};"></div>
        </div>
        <span class="score-text" style="color:${barColor};">${lure.score}%</span>
      </div>
      <div class="stat-mini-grid">
        <span>수심: <strong>${lure.depthText}</strong></span>
        <span>파동: <strong>${lure.vibration}/100</strong></span>
        <span>회피력: <strong>${lure.snagRes}/100</strong></span>
        <span>적정수온: <strong>${lure.tempRange[0]}~${lure.tempRange[1]}°C</strong></span>
      </div>
    `;
    listEl.appendChild(item);
  });

  // 상세 패널 업데이트
  const activeLure = ranked.find(l => l.id === state.selectedLureId) || ranked[0];
  if (activeLure) {
    const detailEl = document.getElementById("detailPanel");
    const catBadgeClass = activeLure.category === "HARD" ? "cat-hard" : activeLure.category === "WIRE" ? "cat-wire" : "cat-soft";
    const currentTimeTip = activeLure.timeTip[state.time];
    const currentColorRec = activeLure.colorGuide ? activeLure.colorGuide[state.clarity] : "내추럴 컬러";

    detailEl.innerHTML = `
      <div class="detail-top">
        <div>
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px; flex-wrap:wrap;">
            <span class="cat-badge ${catBadgeClass}" style="padding:3px 10px; font-size:0.74rem;">${activeLure.catLabel}</span>
            ${activeLure.bfsFriendly ? '<span class="mini-tag tag-bfs">⚡ BFS 추천</span>' : ''}
          </div>
          <div class="detail-title">${activeLure.name}</div>
          <div class="detail-sub">공략 수심층: ${activeLure.depthText} | 권장 리트리브 템포: ${activeLure.speed}</div>
        </div>
        <div class="score-pill">
          매칭도 ${activeLure.score}%
        </div>
      </div>

      <div class="detail-specs">
        <div class="spec-item">
          <span class="label">⚡ BFS 피네스 권장 세팅</span>
          <div class="value">${activeLure.bfsSpec}</div>
        </div>
        <div class="spec-item" style="border-left-color:#a855f7;">
          <span class="label">🎣 스탠다드 베이트/스피닝 세팅</span>
          <div class="value">${activeLure.stdSpec}</div>
        </div>
        <div class="spec-item" style="border-left-color:#10b981;">
          <span class="label">🪝 권장 바늘(훅) & 채비 팁</span>
          <div class="value">${activeLure.hookGuide || "표준 훅 세팅"}</div>
        </div>
        <div class="spec-item" style="border-left-color:#f59e0b;">
          <span class="label">🎨 현재 물색(${clarityLabels[state.clarity]}) 베스트 컬러</span>
          <div class="value">${currentColorRec}</div>
        </div>
      </div>

      <div class="tactical-box" style="border-color:rgba(250, 204, 21, 0.35); background:rgba(250, 204, 21, 0.07);">
        <strong style="color:#facc15;">🕒 [${timeLabels[state.time]}] 시간대 공략 포인트</strong>
        ${currentTimeTip}
      </div>

      <div class="tactical-box">
        <strong>💡 기본 액션 & 바이트 유도 원리</strong>
        ${activeLure.desc}
      </div>
    `;

    // 조행 일지 폼의 히트 루어 셀렉트 박스도 동기화
    const logLureSelect = document.getElementById("logLureInput");
    if (logLureSelect && !logLureSelect.dataset.userEdited) {
      logLureSelect.value = activeLure.name;
    }
  }

  renderGuideTabDynamic();
}

// === 4. 실시간 날씨 조회 & 시뮬레이터 자동 동기화 ===
async function loadWeatherForSpot(spotId, autoSyncSimulator = true) {
  const statusEl = document.getElementById("liveStatusText");
  statusEl.textContent = "기상 위성·기압 데이터 수신 중...";

  try {
    let lat, lon, customName = null;
    if (spotId === "gps") {
      const pos = await new Promise((resolve, reject) => {
        if (!navigator.geolocation) reject(new Error("브라우저가 GPS를 지원하지 않습니다."));
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 8000
        });
      });
      lat = pos.coords.latitude;
      lon = pos.coords.longitude;
    } else {
      const spot = KOREA_SPOTS.find(s => s.id === spotId) || KOREA_SPOTS[1];
      lat = spot.lat;
      lon = spot.lon;
      customName = spot.name.replace(/^[^\s]+\s/, "");
    }

    const w = await WeatherEngine.fetchLiveWeather(lat, lon, customName);
    renderWeatherBanner(w);

    if (autoSyncSimulator) {
      applyLiveWeatherToSimulator(false);
    }
  } catch (err) {
    statusEl.textContent = "GPS 권한 확인 필요 → 예당호 기준으로 임시 표시 중";
    const fallback = KOREA_SPOTS[1];
    const w = await WeatherEngine.fetchLiveWeather(fallback.lat, fallback.lon, "충남 예산 예당호 (GPS 미허용 기본값)");
    renderWeatherBanner(w);
    if (autoSyncSimulator) {
      applyLiveWeatherToSimulator(false);
    }
  }
}

function renderWeatherBanner(w) {
  document.getElementById("liveStatusText").textContent = `${w.locationName} (${w.updatedAt} 실시간 기상청/Open-Meteo 연동)`;
  document.getElementById("mAirTemp").textContent = `${w.airTemp}°C`;
  document.getElementById("mAirSub").textContent = `체감 ${w.apparentTemp}°C · ${w.weatherIcon} ${w.weatherText}`;

  document.getElementById("mWaterTemp").textContent = `약 ${w.estimatedWaterTemp}°C`;
  document.getElementById("mWaterSub").textContent = `계절 열용량 보정 추정 수온`;

  document.getElementById("mWind").textContent = `${w.windSpeedMs} m/s`;
  document.getElementById("mWindSub").textContent = `${w.windDir} · ${windLabels[w.windState]}`;

  document.getElementById("mPressure").textContent = `${w.pressure} hPa`;
  const diffSign = w.pressureDiff3h >= 0 ? `+${w.pressureDiff3h}` : `${w.pressureDiff3h}`;
  document.getElementById("mPressureSub").textContent = `3시간 변화: ${diffSign} hPa`;

  document.getElementById("mSunTime").textContent = `${w.sunrise} / ${w.sunset}`;
  document.getElementById("mSunSub").textContent = `${w.moon.icon} ${w.moon.label}`;

  const biteEl = document.getElementById("mBiteScore");
  biteEl.textContent = `${w.biteAnalysis.score}점`;
  biteEl.style.color = w.biteAnalysis.color;
  document.getElementById("mBiteSub").textContent = w.biteAnalysis.grade;

  document.getElementById("livePressureTactic").innerHTML = `
    <div>
      <strong style="color:${w.biteAnalysis.color}; margin-right:8px;">${w.biteAnalysis.pressureStatus}</strong>
      <span>${w.biteAnalysis.pressureTactic}</span>
    </div>
  `;

  // 실시간 기압/월령 분석 탭 상세 업데이트
  const deepWeatherBox = document.getElementById("deepWeatherAnalysisBox");
  if (deepWeatherBox) {
    deepWeatherBox.innerHTML = `
      <div class="pattern-list">
        <div class="pattern-item" style="border-left-color:${w.biteAnalysis.color};">
          <div class="p-head">
            <span>📊 현재 기압 & 부레 활성도 브리핑</span>
            <span class="p-range">${w.pressure} hPa (${diffSign} hPa/3h)</span>
          </div>
          <div class="p-desc">${w.biteAnalysis.pressureTactic}</div>
        </div>
        <div class="pattern-item" style="border-left-color:#facc15;">
          <div class="p-head">
            <span>${w.moon.icon} 오늘의 음력 월령(물때) & 대물 타깃 전략</span>
            <span class="p-range">${w.moon.label}</span>
          </div>
          <div class="p-desc">${w.moon.tip}</div>
        </div>
        <div class="pattern-item" style="border-left-color:#38bdf8;">
          <div class="p-head">
            <span>🌅 오늘의 골든 피딩 타임 (일출·일몰 전후 90분)</span>
            <span class="p-range">일출 ${w.sunrise} / 일몰 ${w.sunset}</span>
          </div>
          <div class="p-desc">
            오전 피딩: <strong>${w.sunrise} 전후 1시간 30분</strong> (연안 쉘로우 무빙/탑워터 집중) <br/>
            오후 피딩: <strong>${w.sunset} 전후 1시간 30분</strong> (베이트피쉬 연안 회유 목길 공략)
          </div>
        </div>
      </div>
    `;
  }
}

function applyLiveWeatherToSimulator(showToast = true) {
  const w = WeatherEngine.currentData;
  if (!w) return;

  state.season = w.season;
  state.time = w.timeOfDay;
  state.temp = w.estimatedWaterTemp;
  state.wind = w.windState;
  if (w.precipitation > 2.0 || w.windSpeedMs >= 5.5) {
    state.clarity = "muddy";
  }

  const top = getFilteredAndRankedLures()[0];
  if (top) state.selectedLureId = top.id;
  renderUI();

  if (showToast) {
    const btn = document.getElementById("btnApplyLive");
    const orig = btn.innerHTML;
    btn.innerHTML = "✅ 실시간 환경 반영 완료!";
    setTimeout(() => { btn.innerHTML = orig; }, 1800);
  }
}

// === 5. 가이드 탭 (물색 컬러 팔레트 & 싱커표 & 수온 치트시트) 렌더링 ===
function initStaticGuideTables() {
  // 싱커 테이블
  const sinkerBody = document.getElementById("sinkerTableBody");
  if (sinkerBody) {
    sinkerBody.innerHTML = SINKER_CHART.map(row => `
      <tr>
        <td><strong>${row.oz}</strong></td>
        <td style="color:#38bdf8; font-weight:700;">${row.gram}</td>
        <td style="color:#cbd5e1;">${row.use}</td>
      </tr>
    `).join("");
  }

  // 수온별 생태 패턴
  const tempPatternEl = document.getElementById("waterTempPatternsList");
  if (tempPatternEl) {
    tempPatternEl.innerHTML = WATER_TEMP_PATTERNS.map(p => `
      <div class="pattern-item">
        <div class="p-head">
          <span>${p.title}</span>
          <span class="p-range">${p.range}</span>
        </div>
        <div class="p-desc">${p.desc}</div>
      </div>
    `).join("");
  }
}

function renderGuideTabDynamic() {
  const colorBox = document.getElementById("dynamicColorGuideBox");
  if (!colorBox) return;

  const info = COLOR_PALETTE_GUIDE[state.clarity] || COLOR_PALETTE_GUIDE.stained;
  colorBox.innerHTML = `
    <div style="margin-bottom:8px; font-size:0.86rem; color:#38bdf8; font-weight:700;">
      현재 선택된 물색: ${info.label}
    </div>
    <p style="font-size:0.82rem; color:var(--text-muted);">${info.summary}</p>
    <div class="swatch-grid">
      ${info.swatches.map(s => `
        <div class="swatch-item">
          <span class="swatch-circle" style="background:${s.hex};"></span>
          <div>
            <div style="font-size:0.84rem; font-weight:700; color:#f8fafc;">${s.name}</div>
            <div style="font-size:0.72rem; color:var(--text-muted);">${s.sub}</div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

// === 6. 나만의 조행 기록장 (LocalStorage CRUD) ===
const STORAGE_KEY = "bass_tactical_catch_logs_v1";

function loadCatchLogs() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch (e) {
    return [];
  }
}

function saveCatchLogs(logs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

function renderCatchLogs() {
  const container = document.getElementById("catchLogList");
  if (!container) return;

  const logs = loadCatchLogs();
  if (logs.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:26px; color:var(--text-muted); font-size:0.86rem;">
        아직 저장된 조행 기록이 없습니다. 위 버튼을 눌러 오늘 히트한 루어와 필드 환경(기온·기압·수온)을 원클릭으로 기록해 보세요!
      </div>
    `;
    return;
  }

  container.innerHTML = logs.map(item => `
    <div class="log-entry">
      <div>
        <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:4px;">
          <span style="font-weight:800; color:#4ade80; font-size:0.95rem;">🐟 ${item.sizeCm}cm 히트!</span>
          <span style="font-weight:700; color:#f8fafc;">${item.lure}</span>
          <span class="mini-tag tag-bfs">${item.spot}</span>
        </div>
        <div style="font-size:0.78rem; color:var(--text-muted);">
          📅 ${item.date} | 🌡️ 기온 ${item.airTemp}°C (수온 ${item.waterTemp}°C) | 🧭 ${item.pressure}hPa | 💨 ${item.wind}
        </div>
        ${item.memo ? `<div style="font-size:0.82rem; color:#e2e8f0; margin-top:4px;">💬 ${item.memo}</div>` : ""}
      </div>
      <button class="btn-delete-log" onclick="deleteCatchLog('${item.id}')">삭제</button>
    </div>
  `).join("");
}

window.deleteCatchLog = function(id) {
  const next = loadCatchLogs().filter(item => item.id !== id);
  saveCatchLogs(next);
  renderCatchLogs();
};

function setupCatchLogForm() {
  const lureSelect = document.getElementById("logLureInput");
  if (lureSelect) {
    lureSelect.innerHTML = LURES.map(l => `<option value="${l.name}">${l.name}</option>`).join("");
  }

  const addBtn = document.getElementById("btnAddCatchLog");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const sizeCm = document.getElementById("logSizeInput").value.trim() || "35";
      const lure = document.getElementById("logLureInput").value;
      const memo = document.getElementById("logMemoInput").value.trim();
      const w = WeatherEngine.currentData;
      const now = new Date();
      const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

      const newEntry = {
        id: String(Date.now()),
        date: dateStr,
        spot: w ? w.locationName : "필드 기록",
        lure,
        sizeCm,
        airTemp: w ? w.airTemp : state.temp,
        waterTemp: state.temp,
        pressure: w ? w.pressure : 1013,
        wind: windLabels[state.wind],
        memo
      };

      const logs = loadCatchLogs();
      logs.unshift(newEntry);
      saveCatchLogs(logs);
      document.getElementById("logMemoInput").value = "";
      renderCatchLogs();
    });
  }
}

// === 7. 2D Canvas 수중 시뮬레이션 (물색 탁도 & 시간대 조도 & 루어 궤적) ===
const canvas = document.getElementById("waterCanvas");
const ctx = canvas.getContext("2d");
let animTick = 0;

function depthToY(meter, H) {
  const surfaceY = 54;
  const maxDepthY = H - 28;
  const clamped = Math.max(0, Math.min(5.0, meter));
  return surfaceY + (clamped / 5.0) * (maxDepthY - surfaceY);
}

function getBottomYAtX(x, W, H) {
  const t = Math.max(0, Math.min(1, (x - 50) / (W - 90)));
  if (state.struct === "shallow_weed") {
    return depthToY(0.8 + t * 2.2, H);
  } else if (state.struct === "rock_slope") {
    const breakSlope = t < 0.35 ? 0.8 + t * 2.0 : t < 0.65 ? 1.5 + (t - 0.35) * 6.5 : 3.45 + (t - 0.65) * 2.0;
    return depthToY(breakSlope, H);
  } else if (state.struct === "heavy_cover") {
    return depthToY(1.2 + t * 2.8, H);
  } else {
    return depthToY(1.8 + t * 3.0, H);
  }
}

function drawScene() {
  animTick += 0.018;
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  // 1. 하늘 배경 (출조 시간대별)
  const skyGrad = ctx.createLinearGradient(0, 0, 0, 54);
  if (state.time === "dawn_dusk") {
    skyGrad.addColorStop(0, "#311042");
    skyGrad.addColorStop(0.6, "#7c2d12");
    skyGrad.addColorStop(1, "#f97316");
  } else if (state.time === "midday") {
    skyGrad.addColorStop(0, "#0284c7");
    skyGrad.addColorStop(1, "#7dd3fc");
  } else {
    skyGrad.addColorStop(0, "#020617");
    skyGrad.addColorStop(1, "#0f172a");
  }
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, 54);

  // 해 / 노을 / 달
  if (state.time === "dawn_dusk") {
    ctx.fillStyle = "rgba(251, 146, 60, 0.85)";
    ctx.beginPath();
    ctx.arc(W * 0.5, 46, 20, Math.PI, 0);
    ctx.fill();
  } else if (state.time === "midday") {
    ctx.fillStyle = "#fef08a";
    ctx.beginPath();
    ctx.arc(W * 0.5, 22, 13, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillStyle = "#fde047";
    ctx.beginPath();
    ctx.arc(W * 0.5, 22, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    [0.2, 0.32, 0.43, 0.62, 0.75].forEach((ratio, i) => {
      ctx.fillRect(W * ratio, 12 + (i % 3) * 9, 2, 2);
    });
  }

  // 2. 물색(Clarity) & 시간대 기반 수중 배경
  const waterGrad = ctx.createLinearGradient(0, 54, 0, H);
  if (state.time === "night") {
    waterGrad.addColorStop(0, "#082032");
    waterGrad.addColorStop(1, "#020813");
  } else if (state.clarity === "muddy") {
    waterGrad.addColorStop(0, "#3f3624");
    waterGrad.addColorStop(0.5, "#292318");
    waterGrad.addColorStop(1, "#12100b");
  } else if (state.clarity === "stained") {
    waterGrad.addColorStop(0, "#0f4c5c");
    waterGrad.addColorStop(0.5, "#09313d");
    waterGrad.addColorStop(1, "#04161e");
  } else {
    waterGrad.addColorStop(0, "#0284c7");
    waterGrad.addColorStop(0.5, "#075985");
    waterGrad.addColorStop(1, "#05192d");
  }
  ctx.fillStyle = waterGrad;
  ctx.fillRect(0, 54, W, H - 54);

  // 3. 수면 파도 애니메이션
  ctx.beginPath();
  const waveAmp = state.wind === "calm" ? 1.2 : state.wind === "moderate" ? 3.5 : 6.8;
  const waveFreq = state.wind === "strong" ? 0.045 : 0.025;
  for (let x = 0; x <= W; x += 8) {
    const wy = 54 + Math.sin(x * waveFreq + animTick * 3.5) * waveAmp;
    if (x === 0) ctx.moveTo(x, wy);
    else ctx.lineTo(x, wy);
  }
  ctx.strokeStyle = state.time === "dawn_dusk" ? "#fdba74" : "#38bdf8";
  ctx.lineWidth = 2;
  ctx.stroke();

  // 4. 수심 그리드 라인 (1m ~ 4m)
  ctx.font = "11px sans-serif";
  ctx.fillStyle = "rgba(148, 163, 184, 0.68)";
  ctx.strokeStyle = "rgba(148, 163, 184, 0.14)";
  ctx.lineWidth = 1;
  [1, 2, 3, 4].forEach(m => {
    const y = depthToY(m, H);
    ctx.beginPath();
    ctx.setLineDash([4, 4]);
    ctx.moveTo(45, y);
    ctx.lineTo(W - 15, y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillText(`${m}.0m`, 10, y + 4);
  });
  ctx.fillText("수면 0m", 6, 48);

  // 5. 바닥 지형 및 스트럭처
  ctx.beginPath();
  ctx.moveTo(0, H);
  ctx.lineTo(0, depthToY(0.3, H));
  ctx.lineTo(50, depthToY(0.5, H));
  for (let x = 50; x <= W; x += 12) {
    ctx.lineTo(x, getBottomYAtX(x, W, H));
  }
  ctx.lineTo(W, H);
  ctx.closePath();
  const terrainGrad = ctx.createLinearGradient(0, 120, 0, H);
  terrainGrad.addColorStop(0, "#334155");
  terrainGrad.addColorStop(1, "#0f172a");
  ctx.fillStyle = terrainGrad;
  ctx.fill();
  ctx.strokeStyle = "#64748b";
  ctx.lineWidth = 2;
  ctx.stroke();

  if (state.struct === "shallow_weed") {
    for (let wx = 110; wx <= W - 180; wx += 32) {
      const by = getBottomYAtX(wx, W, H);
      const weedH = 36 + (wx % 20);
      ctx.beginPath();
      ctx.moveTo(wx, by);
      ctx.quadraticCurveTo(wx + Math.sin(animTick * 2 + wx) * 8, by - weedH * 0.5, wx + Math.sin(animTick * 2 + wx) * 12, by - weedH);
      ctx.strokeStyle = "rgba(34, 197, 94, 0.68)";
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  } else if (state.struct === "rock_slope") {
    for (let rx = 130; rx <= W - 140; rx += 45) {
      const by = getBottomYAtX(rx, W, H);
      ctx.fillStyle = "#475569";
      ctx.beginPath();
      ctx.arc(rx, by - 4, 10, Math.PI, 0);
      ctx.fill();
    }
  } else if (state.struct === "heavy_cover") {
    [W * 0.33, W * 0.52, W * 0.7].forEach(tx => {
      const by = getBottomYAtX(tx, W, H);
      ctx.strokeStyle = "#78350f";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(tx, by);
      ctx.lineTo(tx, by - 92);
      ctx.moveTo(tx, by - 48);
      ctx.lineTo(tx - 22, by - 72);
      ctx.moveTo(tx, by - 62);
      ctx.lineTo(tx + 24, by - 84);
      ctx.stroke();
    });
  }

  // 6. 선택된 루어 타겟 수심층 및 액션 궤적
  const activeLure = LURES.find(l => l.id === state.selectedLureId) || LURES[0];
  const [minD, maxD] = activeLure.depthRange;
  const zoneTop = depthToY(minD, H);
  const zoneBot = depthToY(Math.max(minD + 0.25, maxD), H);

  ctx.fillStyle = activeLure.category === "HARD"
    ? "rgba(245, 158, 11, 0.13)"
    : activeLure.category === "WIRE"
    ? "rgba(168, 85, 247, 0.13)"
    : "rgba(16, 185, 129, 0.13)";
  ctx.fillRect(50, zoneTop, W - 65, Math.max(14, zoneBot - zoneTop));

  const rodTipX = 66;
  const rodTipY = 26;
  ctx.strokeStyle = "#cbd5e1";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(16, 50);
  ctx.lineTo(rodTipX, rodTipY);
  ctx.stroke();

  const progress = (animTick * 0.22) % 1;
  const startX = W - 65;
  const endX = 125;
  const lureX = startX - progress * (startX - endX);

  const midDepthY = depthToY((minD + maxD) / 2, H);
  const localBottomY = getBottomYAtX(lureX, W, H);
  let lureY = midDepthY;
  let actionLabel = "정속 리트리브";

  switch (activeLure.actionType) {
    case "top_walk":
    case "buzz_top":
      lureY = 54 + Math.sin(animTick * 12) * 2.5;
      actionLabel = activeLure.actionType === "buzz_top" ? "수면 고속 버징 (물보라)" : "수면 독워킹 & 파즈";
      break;
    case "crank_shallow":
    case "crank_deep":
      lureY = Math.min(midDepthY + Math.sin(animTick * 14) * 5, localBottomY - 8);
      actionLabel = Math.abs(lureY - (localBottomY - 8)) < 4 ? "바텀 태핑 (바닥 돌 노킹!)" : "와블링 잠영 리트리브";
      break;
    case "jerk_pause":
    case "shad_suspend": {
      const cycle = (animTick * 2.5) % 2;
      if (cycle < 1.1) {
        lureY = midDepthY + Math.sin(animTick * 18) * 6;
        actionLabel = "연속 트위칭 / 다팅 액션";
      } else {
        lureY = midDepthY;
        actionLabel = "⏸ 수중 스테이 (바이트 찬스!)";
      }
      break;
    }
    case "metal_liftfall": {
      const saw = Math.abs(Math.sin(animTick * 4.5));
      lureY = (localBottomY - 6) - saw * 34;
      actionLabel = "바닥 리프트 앤 폴 (Lift & Fall)";
      break;
    }
    case "soft_fall":
      lureY = 66 + progress * (Math.min(depthToY(1.6, H), localBottomY - 10) - 66);
      actionLabel = "프리폴링 & 수평 트위칭";
      break;
    case "soft_neko":
    case "soft_freerig":
    case "soft_jig": {
      const hop = Math.abs(Math.sin(animTick * 3.8)) * 18;
      lureY = localBottomY - 6 - hop;
      actionLabel = "바닥 호핑 & 쉐이킹";
      break;
    }
    case "soft_downshot":
      lureY = localBottomY - 24 + Math.sin(animTick * 16) * 3;
      actionLabel = "바닥 단차 고정 + 제자리 쉐이킹";
      ctx.strokeStyle = "rgba(148,163,184,0.6)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(lureX, lureY);
      ctx.lineTo(lureX, localBottomY - 2);
      ctx.stroke();
      ctx.fillStyle = "#94a3b8";
      ctx.beginPath();
      ctx.arc(lureX, localBottomY - 3, 3.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    default:
      lureY = Math.min(midDepthY + Math.sin(animTick * 8) * 4, localBottomY - 12);
      actionLabel = "중층 롤링 / 유영 리트리브";
  }

  // 가이드 점선
  ctx.beginPath();
  ctx.setLineDash([3, 5]);
  ctx.strokeStyle = "rgba(56, 189, 248, 0.45)";
  ctx.lineWidth = 1.5;
  ctx.moveTo(startX, midDepthY);
  ctx.lineTo(endX, midDepthY);
  ctx.stroke();
  ctx.setLineDash([]);

  // 낚싯줄
  ctx.beginPath();
  ctx.moveTo(rodTipX, rodTipY);
  ctx.quadraticCurveTo((rodTipX + lureX) / 2, Math.min(lureY, 66), lureX, lureY);
  ctx.strokeStyle = "rgba(226, 232, 240, 0.72)";
  ctx.lineWidth = 1.3;
  ctx.stroke();

  // 루어 진동 파동 링
  const pulseRadius = 8 + ((animTick * 18) % 22) * (activeLure.vibration / 85);
  ctx.beginPath();
  ctx.arc(lureX, lureY, pulseRadius, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(56, 189, 248, 0.35)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // 루어 본체
  const lureColor = activeLure.category === "HARD" ? "#f59e0b" : activeLure.category === "WIRE" ? "#c084fc" : "#10b981";
  ctx.fillStyle = lureColor;
  ctx.beginPath();
  ctx.ellipse(lureX, lureY, 11, 5.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // 추적하는 배스 실루엣
  const bassX = lureX + 38 + Math.sin(animTick * 3) * 8;
  const bassY = Math.min(localBottomY - 14, lureY + 10);
  ctx.fillStyle = "rgba(74, 222, 128, 0.85)";
  ctx.beginPath();
  ctx.ellipse(bassX, bassY, 14, 7, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(bassX + 12, bassY);
  ctx.lineTo(bassX + 21, bassY - 6);
  ctx.lineTo(bassX + 21, bassY + 6);
  ctx.closePath();
  ctx.fill();

  // 우측 상단 액션 자막 박스
  ctx.fillStyle = "rgba(15, 23, 42, 0.86)";
  ctx.fillRect(W - 265, 8, 255, 32);
  ctx.strokeStyle = "#334155";
  ctx.strokeRect(W - 265, 8, 255, 32);
  ctx.fillStyle = "#38bdf8";
  ctx.font = "bold 12px sans-serif";
  ctx.fillText(`▶ ${actionLabel}`, W - 254, 28);

  requestAnimationFrame(drawScene);
}

// === 8. 이벤트 바인딩 & 초기화 ===
function initEvents() {
  // 포인트 선택 드롭다운 초기화
  const spotSelect = document.getElementById("spotSelect");
  if (spotSelect) {
    spotSelect.innerHTML = KOREA_SPOTS.map(s => `<option value="${s.id}" ${s.id === state.selectedSpotId ? "selected" : ""}>${s.name}</option>`).join("");
    spotSelect.addEventListener("change", (e) => {
      state.selectedSpotId = e.target.value;
      loadWeatherForSpot(state.selectedSpotId, true);
    });
  }

  document.getElementById("btnGpsLocate")?.addEventListener("click", () => {
    state.selectedSpotId = "gps";
    if (spotSelect) spotSelect.value = "gps";
    loadWeatherForSpot("gps", true);
  });

  document.getElementById("btnApplyLive")?.addEventListener("click", () => {
    applyLiveWeatherToSimulator(true);
  });

  // 모바일 필터 접기/펼치기
  const mobileToggleHeader = document.getElementById("mobileControlToggle");
  const controlsGrid = document.getElementById("controlsGrid");
  if (mobileToggleHeader && controlsGrid) {
    mobileToggleHeader.addEventListener("click", () => {
      state.mobileControlsOpen = !state.mobileControlsOpen;
      controlsGrid.classList.toggle("collapsed-mobile", !state.mobileControlsOpen);
      document.getElementById("mobileToggleIcon").textContent = state.mobileControlsOpen ? "▲ 닫기" : "▼ 상세 조절";
    });
  }

  // 계절 프리셋
  document.querySelectorAll("#seasonGroup .btn-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const s = btn.getAttribute("data-season");
      state.season = s;
      state.temp = seasonPresets[s].temp;
      state.wind = seasonPresets[s].wind;
      state.clarity = seasonPresets[s].clarity;
      state.struct = seasonPresets[s].struct;
      const top = getFilteredAndRankedLures()[0];
      if (top) state.selectedLureId = top.id;
      renderUI();
    });
  });

  // 시간대
  document.querySelectorAll("#timeGroup .btn-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      state.time = btn.getAttribute("data-time");
      const top = getFilteredAndRankedLures()[0];
      if (top) state.selectedLureId = top.id;
      renderUI();
    });
  });

  // 수온 슬라이더
  document.getElementById("tempSlider").addEventListener("input", (e) => {
    state.temp = parseInt(e.target.value, 10);
    const top = getFilteredAndRankedLures()[0];
    if (top) state.selectedLureId = top.id;
    renderUI();
  });

  // 바람
  document.querySelectorAll("#windGroup .btn-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      state.wind = btn.getAttribute("data-wind");
      const top = getFilteredAndRankedLures()[0];
      if (top) state.selectedLureId = top.id;
      renderUI();
    });
  });

  // 물색 (NEW)
  document.querySelectorAll("#clarityGroup .btn-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      state.clarity = btn.getAttribute("data-clarity");
      const top = getFilteredAndRankedLures()[0];
      if (top) state.selectedLureId = top.id;
      renderUI();
    });
  });

  // 지형
  document.querySelectorAll("#structGroup .btn-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      state.struct = btn.getAttribute("data-struct");
      const top = getFilteredAndRankedLures()[0];
      if (top) state.selectedLureId = top.id;
      renderUI();
    });
  });

  // 카테고리 필터
  document.querySelectorAll("#catFilterGroup .btn-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      state.catFilter = btn.getAttribute("data-cat");
      const top = getFilteredAndRankedLures()[0];
      if (top) state.selectedLureId = top.id;
      renderUI();
    });
  });

  // BFS 필터
  document.querySelectorAll("#tackleGroup .btn-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      state.tackleFilter = btn.getAttribute("data-tackle");
      const top = getFilteredAndRankedLures()[0];
      if (top) state.selectedLureId = top.id;
      renderUI();
    });
  });

  // 상단 탭 & 모바일 하단 네비게이션 전환
  const switchTab = (tabId) => {
    state.activeTab = tabId;
    document.querySelectorAll(".tab-section").forEach(sec => {
      sec.classList.toggle("active", sec.id === tabId);
    });
    document.querySelectorAll(".tab-btn, .m-nav-item").forEach(b => {
      b.classList.toggle("active", b.getAttribute("data-target") === tabId);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  document.querySelectorAll(".tab-btn, .m-nav-item").forEach(btn => {
    btn.addEventListener("click", () => switchTab(btn.getAttribute("data-target")));
  });
}

// 초기 실행
window.addEventListener("DOMContentLoaded", () => {
  initStaticGuideTables();
  setupCatchLogForm();
  renderCatchLogs();
  initEvents();
  renderUI();
  requestAnimationFrame(drawScene);

  // 초기 실시간 기상 조회 (기본: 예당호, 사용자가 '내 위치 GPS' 클릭 시 즉시 GPS로 전환)
  loadWeatherForSpot(state.selectedSpotId, true);
});
