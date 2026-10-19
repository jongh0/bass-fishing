// === 1. 국내 대표 배스 필드 프리셋 데이터 (농어촌공사 RAWRIS 실시간 수위 equipNo 연동) ===
const KOREA_SPOTS = [
  { id: "gps", name: "📍 내 현재 위치 (GPS 실시간 + 인근 저수지 수위)", lat: null, lon: null, equipNo: null, region: "GPS 자동 탐색" },
  { id: "asan", name: "🌊 충남 아산호 (신정호/석축/연안 · 수위연동)", lat: 36.9012, lon: 126.8834, equipNo: 4140, region: "충청남도 아산시 영인면 / 평택시" },
  { id: "pyeongtaek", name: "🌊 경기/충남 평택호 (석축/수초/보트 · 수위연동)", lat: 36.9138, lon: 126.9096, equipNo: 4140, region: "경기도 평택시 현덕면 권관리" },
  { id: "yedang", name: "🌊 충남 예산 예당호 (국민 배스 성지 · 수위연동)", lat: 36.6290, lon: 126.8020, equipNo: 1081, region: "충청남도 예산군 응봉면" },
  { id: "daeho", name: "🌊 충남 당진 대호만 (수초/갈대/런커 · 수위연동)", lat: 36.9990, lon: 126.4553, equipNo: 4318, region: "충청남도 당진시 정미면" },
  { id: "sapgyo", name: "🌊 충남 당진/아산 삽교호 (석축/수초 · 수위연동)", lat: 36.8876, lon: 126.8286, equipNo: 4139, region: "충청남도 당진시 신평면" },
  { id: "gosam", name: "🌊 경기 안성 고삼지 (빅배스/육초 · 수위연동)", lat: 37.0818, lon: 127.2719, equipNo: 920, region: "경기도 안성시 고삼면" },
  { id: "giheung", name: "🌊 경기 용인 기흥(신갈)지 (수도권 성지 · 수위연동)", lat: 37.2350, lon: 127.0970, equipNo: 897, region: "경기도 용인시 기흥구" },
  { id: "tapjeong", name: "🌊 충남 논산 탑정호 (석축/브레이크 · 수위연동)", lat: 36.1760, lon: 127.1810, equipNo: 1046, region: "충청남도 논산시 부적면" },
  { id: "busa", name: "🌊 충남 보령/서천 부사호 (갈대/험프 · 수위연동)", lat: 36.1907, lon: 126.5582, equipNo: 3928, region: "충청남도 보령시 웅천읍" },
  { id: "jangseong", name: "🌊 전남 장성호 (남녘 빅배스 성지 · 수위연동)", lat: 35.3880, lon: 126.8390, equipNo: 1311, region: "전라남도 장성군 북하면" },
  { id: "naju", name: "🌊 전남 나주호 (중층/석축/수몰나무 · 수위연동)", lat: 34.9637, lon: 126.8450, equipNo: 1206, region: "전라남도 나주시 다도면" },
  { id: "damyang", name: "🌊 전남 담양호 (절벽/브레이크 · 수위연동)", lat: 35.3777, lon: 127.0117, equipNo: 1212, region: "전라남도 담양군 용면" },
  { id: "songjeon", name: "🌊 경북 경주 송전지 (급심/골창 · 수위연동)", lat: 35.7525, lon: 129.4145, equipNo: 1884, region: "경상북도 경주시 천북면" },
  { id: "daecheong", name: "대전/충북 대청호 (빅배스/브레이크)", lat: 36.4775, lon: 127.4808, equipNo: null, region: "대전광역시 동구 / 청주시" },
  { id: "andong", name: "경북 안동호 (딥크랭킹/교각/석축)", lat: 36.6056, lon: 128.8124, equipNo: null, region: "경상북도 안동시 와룡면" },
  { id: "hapcheon", name: "경남 합천호 (급심/수몰나무 커버)", lat: 35.5653, lon: 128.0268, equipNo: null, region: "경상남도 합천군 대병면" }
];

// === 2. 19종 배스 루어 & 채비 완벽 데이터베이스 (물색/훅/싱커/시간대 확장) ===
const LURES = [
  // === HARD BAITS (7) ===
  {
    id: "top_popper_pencil",
    name: "포퍼 / 펜슬베이트 (Topwater)",
    category: "HARD",
    catLabel: "하드베이트",
    bfsFriendly: true,
    depthRange: [0.0, 0.2],
    depthText: "수면 (0m / Top)",
    tempRange: [18, 30],
    bestSeasons: ["summer", "autumn", "spring"],
    bestStruct: ["shallow_weed", "rock_slope"],
    bestWind: ["calm", "moderate"],
    bestTime: ["dawn_dusk", "night"],
    bestClarity: ["clear", "stained"],
    vibration: 75,
    snagRes: 65,
    speed: "중속 (트위칭 & 파즈)",
    bfsSpec: "4g~7g 소형 포퍼/펜슬 (L~ML 로드 + 카본 6~8lb 또는 합사+리더)",
    stdSpec: "7g~14g 스탠다드 탑워터 (ML~M 로드 + 나일론 12lb / 합사)",
    hookGuide: "트레블 훅 #6 ~ #4 (리어 페더/깃털 훅 장착 시 스테이 바이트 급증)",
    colorGuide: {
      clear: "본(Bone/우유빛), 고스트 미노우, 클리어 아유 (실루엣 자연스럽게)",
      stained: "차트루즈 벨리, 크롬/실버 플래시, 화이트 샤드",
      muddy: "매트 블랙(검정 실루엣), 형광 옐로우/차트 백"
    },
    actionType: "top_walk",
    timeTip: {
      dawn_dusk: "새벽 안개나 해질녘 노을 시간대는 베이트피쉬가 수면으로 뜨는 최고의 골든타임입니다. 빠른 독워킹으로 넓게 탐색하세요.",
      midday: "한낮 직사광선 아래에서는 수몰나무 그늘(쉐이드)이나 오버행 아래에 정확히 캐스팅한 뒤 스테이 시간을 길게 가져가야 합니다.",
      night: "야간에는 펜슬보다 물방울 소리가 또렷한 '포퍼'나 날개 달린 크롤러 계열로 제자리 파동을 주는 것이 훨씬 유리합니다."
    },
    desc: "수면 위에서 도망치거나 허우적대는 베이트피쉬를 연출합니다. 포퍼는 '퐁' 하는 물보라와 스테이, 펜슬은 좌우 독워킹(Dog-walking)으로 수면 폭발 바이트를 유도합니다."
  },
  {
    id: "shallow_crank",
    name: "쉘로우 / 마이크로 크랭크베이트",
    category: "HARD",
    catLabel: "하드베이트",
    bfsFriendly: true,
    depthRange: [0.4, 1.2],
    depthText: "0.4 ~ 1.2m",
    tempRange: [14, 26],
    bestSeasons: ["spring", "summer", "autumn"],
    bestStruct: ["rock_slope", "shallow_weed"],
    bestWind: ["moderate", "strong"],
    bestTime: ["dawn_dusk", "night", "midday"],
    bestClarity: ["stained", "muddy", "clear"],
    vibration: 82,
    snagRes: 80,
    speed: "중~고속 정속 리트리브",
    bfsSpec: "3.5g~6g 마이크로 크랭크 (L 로드 + 카본 6~7lb)",
    stdSpec: "7g~14g SR/MR 스퀘어빌 크랭크 (M 글래스컴포짓 로드 + 카본 10~12lb)",
    hookGuide: "트레블 훅 #6 ~ #4 (숏섕크 와이드갭 트레블로 밑걸림 방지 및 털림 최소화)",
    colorGuide: {
      clear: "섹시 샤드(Sexy Shad), 내추럴 블루길, 고스트 크로우",
      stained: "파이어타이거, 시트러스 샤드, 레드 크로우(봄철 특효)",
      muddy: "블랙 백 차트루즈(형광 옆구리), 머스타드/골드 크랭크"
    },
    actionType: "crank_shallow",
    timeTip: {
      dawn_dusk: "연안 석축으로 붙은 피딩 배스를 노려 석축과 평행하게 캐스팅(패러럴 캐스팅)해 빠르게 감아들이세요.",
      midday: "한낮에는 립으로 바닥 돌을 강하게 때리는 '바텀 태핑(Bottom Tapping)' 리액션 바이트 유도가 필수입니다.",
      night: "야간 배스가 얕은 석축으로 올라왔을 때 일정한 속도로 천천히 감아주면 강한 와블링 파동 보고 정확히 찾아와 덮칩니다."
    },
    desc: "강한 와블링 파동으로 넓은 연안과 석축을 빠르게 탐색합니다. 스퀘어빌(네모난 립)이 바닥 돌이나 장애물을 치고 튀어 오르는 순간(Deflection)에 리액션 바이트가 집중됩니다."
  },
  {
    id: "deep_crank",
    name: "미드 / 딥 크랭크베이트",
    category: "HARD",
    catLabel: "하드베이트",
    bfsFriendly: false,
    depthRange: [2.0, 4.0],
    depthText: "2.0 ~ 4.5m",
    tempRange: [12, 24],
    bestSeasons: ["autumn", "summer", "spring"],
    bestStruct: ["rock_slope", "deep_open"],
    bestWind: ["moderate", "strong"],
    bestTime: ["midday", "dawn_dusk"],
    bestClarity: ["stained", "clear", "muddy"],
    vibration: 88,
    snagRes: 78,
    speed: "중속 리트리브 (바닥 노킹)",
    bfsSpec: "소형 딥섀드 크랭크 5~7g으로 대체 운용 권장",
    stdSpec: "14g~21g DR 크랭크 (M~MH 7피트 이상 롱로드 + 카본 10~12lb)",
    hookGuide: "트레블 훅 #4 ~ #2 (깊은 수심 제압을 위해 강선 훅 권장)",
    colorGuide: {
      clear: "프로 블루, 아유(은어), 하프 미러 와카사기(빙어)",
      stained: "차트루즈 루트비어, 블루백 차트, 골드 샤드",
      muddy: "핫 타이거, 매트 차트루즈"
    },
    actionType: "crank_deep",
    timeTip: {
      dawn_dusk: "피딩이 끝나고 배스가 브레이크라인 아래로 빠지기 시작하는 아침 9시 이후부터 위력이 배가됩니다.",
      midday: "한낮 강한 햇빛을 피해 수심 2.5~4m 브레이크라인 턱이나 수중 험프에 내려간 빅배스를 깨우는 최고의 한낮 무빙 카드입니다.",
      night: "야간에는 배스가 얕은 곳으로 뜨기 때문에 딥 크랭크보다는 쉘로우 크랭크가 유리합니다."
    },
    desc: "긴 립을 활용해 급심 브레이크라인과 수중 능선(험프)을 직공합니다. 바닥에 립이 닿아 흙먼지를 일으키며 지나갈 때 깊은 수심의 빅배스가 반사적으로 덮칩니다."
  },
  {
    id: "minnow_jerk",
    name: "미노우 / 저크베이트 (Sinking/SP)",
    category: "HARD",
    catLabel: "하드베이트",
    bfsFriendly: true,
    depthRange: [0.6, 1.6],
    depthText: "0.5 ~ 1.8m",
    tempRange: [9, 21],
    bestSeasons: ["spring", "autumn", "winter"],
    bestStruct: ["rock_slope", "deep_open"],
    bestWind: ["calm", "moderate"],
    bestTime: ["dawn_dusk", "midday"],
    bestClarity: ["clear", "stained"],
    vibration: 55,
    snagRes: 45,
    speed: "트위칭/저킹 후 스테이(Stay)",
    bfsSpec: "4.5g~6.5g 60~70mm 미노우 (L 로드 + 카본 6~7lb)",
    stdSpec: "9g~14g 90~110mm 저크베이트 (ML~M 패스트 테이퍼 + 카본 8~12lb)",
    hookGuide: "세단 훅 #6 ~ #8 (서스펜딩 밸런스를 해치지 않는 경량 세단 바늘 필수)",
    colorGuide: {
      clear: "고스트 미노우, 와카사기(빙어), 실버 크롬 플래시",
      stained: "클라운(Clown/빨간머리), 골드 블랙 백, 테이블락 샤드",
      muddy: "매트 타이거, 차트루즈 사이드"
    },
    actionType: "jerk_pause",
    timeTip: {
      dawn_dusk: "피라미·빙어 등 베이트피쉬가 연안으로 몰리는 해질녘에 트위칭 템포를 빠르게 가져가면 마릿수 폭발이 가능합니다.",
      midday: "맑은 물색의 한낮에는 홀로그램/내추럴 컬러를 선택해 강한 저킹 플래싱과 3초 이상의 긴 스테이로 시각적 바이트를 유도하세요.",
      night: "야간에는 불규칙 다팅 시 배스가 루어를 놓치기 쉬워 정속 릴링 위주로만 천천히 운용해야 합니다."
    },
    desc: "물색이 맑거나 배스가 루어를 따라오기만 할 때 특효약입니다. 2~3회 연속 트위칭으로 번뜩이는 플래싱을 준 뒤 제자리에 멈추는 '스테이(Stay)' 구간에서 입질이 집중됩니다."
  },
  {
    id: "suspending_shad",
    name: "서스펜딩 섀드 (Shad Plug)",
    category: "HARD",
    catLabel: "하드베이트",
    bfsFriendly: true,
    depthRange: [1.0, 2.2],
    depthText: "1.0 ~ 2.2m",
    tempRange: [7, 18],
    bestSeasons: ["spring", "autumn", "winter"],
    bestStruct: ["rock_slope", "deep_open"],
    bestWind: ["calm", "moderate"],
    bestTime: ["midday", "dawn_dusk"],
    bestClarity: ["clear", "stained"],
    vibration: 50,
    snagRes: 55,
    speed: "고속 리트리브 & 롱 스테이",
    bfsSpec: "5g~6.5g 55~60mm SP 섀드 (L 로드 + 카본 5~7lb 필수)",
    stdSpec: "7g~10g 섀드 (ML 스피닝/BFS + 카본 6~8lb)",
    hookGuide: "트레블 훅 #8 ~ #6 (가벼운 침투력의 세단 훅으로 흡입 입질 걸림 향상)",
    colorGuide: {
      clear: "고스트 와카사기, 내추럴 샤드, 오로라 블랙",
      stained: "스폰 타이거, 레드 크로우(초봄), 골드 샤드",
      muddy: "차트루즈 백, 화이트 코어"
    },
    actionType: "shad_suspend",
    timeTip: {
      dawn_dusk: "석축 브레이크라인을 따라 빠르게 감아들이다가 멈춰 세우는 스탑앤고(Stop & Go)로 활성도 높은 개체를 선별합니다.",
      midday: "프레셔가 높아진 한낮에도 작은 실루엣과 촘촘한 파동 덕분에 경계심 없이 바이트를 받아냅니다.",
      night: "파동이 약해 어두운 밤에는 어필력이 떨어지므로 주간~해질녘 위주로 사용하세요."
    },
    desc: "봄철 산란 전후와 가을~초겨울 저활성기 최강의 BFS 하드베이트입니다. 석축 바닥을 스치듯 감다가 멈춰 세우면 뒤따라오던 배스가 그대로 빨아들입니다."
  },
  {
    id: "lipless_vib",
    name: "립리스 바이브레이션 (Lipless Vibe)",
    category: "HARD",
    catLabel: "하드베이트",
    bfsFriendly: true,
    depthRange: [1.2, 3.2],
    depthText: "1.0 ~ 3.5m (전층)",
    tempRange: [11, 23],
    bestSeasons: ["autumn", "spring", "summer"],
    bestStruct: ["deep_open", "rock_slope"],
    bestWind: ["moderate", "strong"],
    bestTime: ["dawn_dusk", "midday", "night"],
    bestClarity: ["stained", "muddy", "clear"],
    vibration: 90,
    snagRes: 40,
    speed: "고속 리트리브 또는 리프트앤폴",
    bfsSpec: "5g~7g 소형 바이브 (L~ML 로드 + 카본 7~8lb)",
    stdSpec: "10g~18g 바이브레이션 (M~MH 로드 + 카본 12~14lb)",
    hookGuide: "트레블 훅 #6 ~ #4 (바닥 걸림이 많다면 배 부분 훅을 더블훅으로 교체)",
    colorGuide: {
      clear: "크롬 블루백, 긴린(비늘 홀로그램), 내추럴 붕어",
      stained: "레드 크로우, 골드 블랙, 그린 타이거",
      muddy: "파이어타이거, 매트 차트루즈"
    },
    actionType: "vib_fast",
    timeTip: {
      dawn_dusk: "광범위한 플랫 지형에서 회유하는 피딩 배스 무리를 가장 먼저 찾아내는 최고의 파일럿 루어입니다.",
      midday: "수심 2~3m 중층이나 바닥층을 리프트 앤 폴로 공략해 가라앉은 배스를 자극하세요.",
      night: "래틀(Rattle) 사운드가 들어간 모델은 야간 오픈워터에서도 청각과 측선 자극으로 뛰어난 조과를 보입니다."
    },
    desc: "립이 없어 역풍을 뚫는 압도적인 비거리를 자랑하며, 강렬한 래틀음과 진동으로 광범위한 오픈워터를 가장 빠르게 수색합니다."
  },
  {
    id: "metal_vibe",
    name: "메탈바이브 (Metal Vibe)",
    category: "HARD",
    catLabel: "하드베이트",
    bfsFriendly: true,
    depthRange: [2.2, 4.5],
    depthText: "2.0 ~ 5.0m+ (바닥층)",
    tempRange: [4, 14],
    bestSeasons: ["winter", "autumn", "spring"],
    bestStruct: ["deep_open", "rock_slope"],
    bestWind: ["calm", "moderate", "strong"],
    bestTime: ["midday", "dawn_dusk"],
    bestClarity: ["clear", "stained", "muddy"],
    vibration: 80,
    snagRes: 30,
    speed: "짧은 리프트 앤 폴 (Lift & Fall)",
    bfsSpec: "3.5g~7g 마이크로 메탈바이브 (L~ML 로드 + 카본 6~7lb)",
    stdSpec: "10g~14g 메탈바이브 (M 로드 + 카본 10~12lb)",
    hookGuide: "더블 훅 #8 ~ #4 (바늘 끝이 위를 향하게 장착되어 바닥 밑걸림을 최소화)",
    colorGuide: {
      clear: "실버 크롬, 리얼 와카사기, 블루길",
      stained: "골드 레드 헤드, 크로우 피쉬, 글로우(야광) 스팟",
      muddy: "골드 차트루즈, 매트 타이거"
    },
    actionType: "metal_liftfall",
    timeTip: {
      dawn_dusk: "기온이 급격히 떨어진 늦가을·겨울 아침, 딥 채널에 뭉쳐 있는 배스 스쿨링 지점을 장타로 직공합니다.",
      midday: "저수온기 일조량이 가장 높은 오후 1~3시경, 수온이 살짝 오르는 골창 바닥에서 가장 강력한 위력을 발휘합니다.",
      night: "야간에는 바닥 밑걸림 파악이 어렵고 배스가 중층/연안으로 이동하므로 비추천합니다."
    },
    desc: "늦가을 수온 급강하부터 한겨울까지 깊은 바닥에 배를 깔고 있는 저활성 배스의 눈앞에 직공하는 최고 병기입니다. 손목 스냅으로 짧게 띄우고 폴링시키는 것이 핵심입니다."
  },

  // === WIRE BAITS (3) ===
  {
    id: "spinnerbait",
    name: "스피너베이트 (Spinnerbait)",
    category: "WIRE",
    catLabel: "와이어베이트",
    bfsFriendly: true,
    depthRange: [0.6, 2.5],
    depthText: "0.5 ~ 2.5m (전층)",
    tempRange: [13, 27],
    bestSeasons: ["autumn", "spring", "summer"],
    bestStruct: ["heavy_cover", "shallow_weed", "rock_slope"],
    bestWind: ["moderate", "strong"],
    bestTime: ["dawn_dusk", "midday", "night"],
    bestClarity: ["stained", "muddy", "clear"],
    vibration: 88,
    snagRes: 95,
    speed: "일정한 슬로우 롤링",
    bfsSpec: "5g~7g 마이크로 스피너베이트 (L~ML 로드 + 카본 7~8lb)",
    stdSpec: "3/8oz(10.5g) ~ 1/2oz(14g) (M~MH 로드 + 카본 12~16lb)",
    hookGuide: "숏바이트(꼬리만 무는 입질) 빈발 시 트레일러 훅(#1~#1/0) 추가 장착 권장",
    colorGuide: {
      clear: "화이트/실버 윌로우 블레이드, 은어/빙어 스커트",
      stained: "화이트 차트루즈 + 골드&실버 탠덤 블레이드",
      muddy: "차트루즈/옐로우 스커트 + 더블 콜로라도 골드 블레이드"
    },
    actionType: "wire_roll",
    timeTip: {
      dawn_dusk: "아침·저녁 피딩 시간대에 수초 엣지와 수몰나무 가지를 넘기며 빠르게 훑으면 빅배스가 거칠게 덮칩니다.",
      midday: "바람이 불거나 한낮 수몰나무 깊은 그늘 속으로 과감히 집어넣어 프리폴링(커브폴링) 바이트를 유도하세요.",
      night: "야간에는 물 저항과 진동이 강한 '콜로라도 블레이드' 장착 모델을 선택해 천천히 슬로우 롤링하면 대물을 만날 확률이 높습니다."
    },
    desc: "바람이 터지고 파도가 치거나 수몰나무·연밭 같은 헤비 커버를 공략할 때 밑걸림 걱정 없이 찔러 넣는 전천후 서치베이트입니다."
  },
  {
    id: "chatterbait",
    name: "채터베이트 (Bladed Jig)",
    category: "WIRE",
    catLabel: "와이어베이트",
    bfsFriendly: true,
    depthRange: [0.5, 1.8],
    depthText: "0.5 ~ 2.0m",
    tempRange: [14, 26],
    bestSeasons: ["autumn", "spring", "summer"],
    bestStruct: ["shallow_weed", "rock_slope"],
    bestWind: ["moderate", "strong"],
    bestTime: ["dawn_dusk", "night", "midday"],
    bestClarity: ["stained", "muddy", "clear"],
    vibration: 96,
    snagRes: 78,
    speed: "중속 리트리브 + 수초 행오프",
    bfsSpec: "4.5g~7g 마이크로 채터 + 2.5~3인치 핀테일 (L~ML 로드)",
    stdSpec: "3/8oz(10.5g) 채터 + 3.5~4.5인치 핀테일/섀드 트레일러 (M~MH 로드)",
    hookGuide: "트레일러 웜은 물 저항이 적은 핀테일(자코, 플루크 계열)을 끼워야 불규칙 다팅 액션이 살아남",
    colorGuide: {
      clear: "그린펌킨 샤드, 화이트 클리어, 스모크 실버",
      stained: "그린펌킨 차트, 화이트&차트루즈, 블루길",
      muddy: "블랙&블루(탁수·야간 최강), 파이어 크로우"
    },
    actionType: "chatter_dart",
    timeTip: {
      dawn_dusk: "로우 라이트 피딩 타임에 삭아 내리는 수초 상단을 스치듯 감아들이면 마릿수와 런커를 동시에 잡을 수 있습니다.",
      midday: "한낮에는 수초 포켓이나 브레이크라인 경계면을 바짝 붙여서 불규칙 행오프(Hang-off) 리액션을 유도하세요.",
      night: "야간 배스 낚시 최고의 주력 루어 중 하나입니다. 손끝에 진동이 또렷이 전달되어 어두운 밤에도 수초 걸림과 입질을 즉각 구분할 수 있습니다."
    },
    desc: "크랭크의 강한 진동과 스피너베이트의 플래싱을 결합한 빅배스 킬러입니다. 수초에 걸렸을 때 순간적으로 뜯어내는 행오프에서 불규칙 다팅이 발생합니다."
  },
  {
    id: "buzzbait",
    name: "버즈베이트 (Buzzbait)",
    category: "WIRE",
    catLabel: "와이어베이트",
    bfsFriendly: true,
    depthRange: [0.0, 0.15],
    depthText: "수면 (0m / Top)",
    tempRange: [16, 29],
    bestSeasons: ["summer", "autumn"],
    bestStruct: ["shallow_weed", "heavy_cover"],
    bestWind: ["calm", "moderate"],
    bestTime: ["dawn_dusk", "night"],
    bestClarity: ["stained", "muddy", "clear"],
    vibration: 94,
    snagRes: 88,
    speed: "착수 즉시 빠른 리트리브",
    bfsSpec: "5g~7g 컴팩트 버즈베이트 (ML 로드 + 카본 8lb)",
    stdSpec: "3/8oz(10.5g) 버즈베이트 + 트레일러 훅 (M~MH 로드 + 카본/합사)",
    hookGuide: "수면 바이트 특성상 미스바이트가 잦으므로 트레일러 훅 또는 섀드웜/그럽웜 트레일러 장착 필수",
    colorGuide: {
      clear: "화이트/실버 프로펠러, 클리어 스커트",
      stained: "차트루즈 화이트, 골드 프로펠러",
      muddy: "올 블랙(All Black) 스커트 + 블랙/골드 블레이드 (야간·탁수 1티어)"
    },
    actionType: "buzz_top",
    timeTip: {
      dawn_dusk: "해 뜨기 직전과 해 질 녘 30분은 버즈베이트의 독무대입니다. 얕은 수초 위를 쉼 없이 지지고 다니세요.",
      midday: "맑은 날 한낮에는 효율이 급감합니다. 단, 비가 오거나 잔뜩 흐린 낮에는 오버행 그늘 밑에서 대박을 터뜨릴 수 있습니다.",
      night: "여름~가을 야간 탑워터의 제왕입니다. 검은색 스커트 모델을 일정한 속도로 감으면 배스가 소리와 기포 줄기를 보고 수면을 폭발시킵니다."
    },
    desc: "수초가 수면까지 자라 다른 루어를 감을 수 없는 쉘로우에서, 프로펠러 파열음과 기포를 일으키며 수면을 빠르게 훑는 공격적인 탑워터입니다."
  },

  // === SOFT BAITS (9) ===
  {
    id: "hollow_frog",
    name: "프로그 (Hollow Body Frog)",
    category: "SOFT",
    catLabel: "소프트베이트",
    bfsFriendly: true,
    depthRange: [0.0, 0.1],
    depthText: "수면/수초 위 (0m)",
    tempRange: [18, 30],
    bestSeasons: ["summer", "autumn"],
    bestStruct: ["shallow_weed", "heavy_cover"],
    bestWind: ["calm", "moderate"],
    bestTime: ["dawn_dusk", "midday", "night"],
    bestClarity: ["stained", "muddy", "clear"],
    vibration: 70,
    snagRes: 99,
    speed: "수초 위 독워킹 & 포켓 스테이",
    bfsSpec: "4.5g~6.5g 마이크로 프로그 (ML 로드 + 합사 1.0~1.5호)",
    stdSpec: "10g~16g 중대형 프로그 (MH~H 프로그 전용 로드 + 합사 3~4호 직결)",
    hookGuide: "바디 일체형 헤비와이어 더블훅 (입질 후 1~2초 뒤 로드에 무게감이 실릴 때 풀 스윙 챔질!)",
    colorGuide: {
      clear: "내추럴 그린 프로그, 화이트 벨리(흰색 배)",
      stained: "차트루즈 벨리, 브라운/옐로우 도트",
      muddy: "매트 블랙(검은 배), 네온 오렌지/차트"
    },
    actionType: "top_walk",
    timeTip: {
      dawn_dusk: "연밭이나 마름 수초가 덮인 쉘로우 엣지에서 빠른 독워킹으로 피딩 배스를 유인합니다.",
      midday: "한낮 폭염 속 마름·연잎 이불(매트 커버) 밑 그늘에 숨은 런커 배스의 머리 위를 직공할 수 있는 유일무이한 루어입니다.",
      night: "야간 수초대에서도 밑걸림이 전혀 없어 과감하게 캐스팅한 뒤 천천히 파동을 주며 끌어올 수 있습니다."
    },
    desc: "바늘이 몸통에 밀착된 위드리스(Weedless) 구조로, 수면이 수초와 부유물로 완전히 덮인 극한의 헤비 커버 위를 걸림 없이 돌파합니다."
  },
  {
    id: "no_sinker",
    name: "노싱커 리그 (No-Sinker / 폴링)",
    category: "SOFT",
    catLabel: "소프트베이트",
    bfsFriendly: true,
    depthRange: [0.2, 1.5],
    depthText: "수면 ~ 1.5m (폴링)",
    tempRange: [15, 29],
    bestSeasons: ["spring", "summer", "autumn"],
    bestStruct: ["shallow_weed", "heavy_cover"],
    bestWind: ["calm"],
    bestTime: ["dawn_dusk", "midday"],
    bestClarity: ["clear", "stained"],
    vibration: 35,
    snagRes: 92,
    speed: "초저속 프리폴링 & 트위칭",
    bfsSpec: "3~4인치 고비중 스틱베이트/섀드웜 (L~ML 로드 + 카본 6~8lb)",
    stdSpec: "5인치 야마센코 / 플루크 / 고비중 크로우 (M 로드 + 카본 10~14lb)",
    hookGuide: "3인치: 오프셋 #1~#1/0 | 4인치: #2/0~#3/0 | 5인치: #4/0~#5/0 (싱커 없음 / 0g)",
    colorGuide: {
      clear: "워터멜론 시드(수박색), 그린펌킨 페퍼, 베이비 배스",
      stained: "그린펌킨 차트테일, 시나몬 블루플레이크, 펄 화이트",
      muddy: "준버그(Junebug), 블랙 블루플레이크, 핑크/화이트"
    },
    actionType: "soft_fall",
    timeTip: {
      dawn_dusk: "연안 수초 포켓이나 갈대 옆에 조용히 착수시켜 프리폴링시키면 경계심 없이 라인이 쭉 뻗어 나갑니다.",
      midday: "한낮 나무 그늘(오버행) 아래로 스키핑(Skipping) 캐스팅해 자연스럽게 가라앉히는 폴링 바이트 전략이 최고입니다.",
      night: "라인이 흐르는 시각적 입질 파악이 어렵고 파동이 약해 야간에는 효율이 떨어집니다."
    },
    desc: "싱커 없이 웜 자체 무게로만 수평 프리폴링시키는 채비입니다. 인위적인 이물감이 전혀 없어 경계심 높은 빅배스가 덥석 삼킵니다."
  },
  {
    id: "kaizer_rig",
    name: "카이젤리그 (Kaizer / 지그헤드 와키)",
    category: "SOFT",
    catLabel: "소프트베이트",
    bfsFriendly: true,
    depthRange: [0.6, 2.5],
    depthText: "0.5 ~ 2.5m (중층/바닥)",
    tempRange: [10, 26],
    bestSeasons: ["spring", "summer", "autumn"],
    bestStruct: ["rock_slope", "heavy_cover", "shallow_weed"],
    bestWind: ["calm", "moderate"],
    bestTime: ["midday", "dawn_dusk"],
    bestClarity: ["clear", "stained", "muddy"],
    vibration: 58,
    snagRes: 68,
    speed: "폴링 & 중층/바닥 쉐이킹",
    bfsSpec: "4~5인치 스트레이트웜 + 1/32~1/16oz 카이젤 지그헤드 (L 로드 + 카본 6~7lb)",
    stdSpec: "스피닝 L 또는 BFS 피네스 태클 전용 (5~6인치 스왐프크롤러/플리커쉐이크)",
    hookGuide: "와키 전용 지그헤드 1/32oz(0.9g) ~ 1/16oz(1.8g) (수초·나무 주변은 위드가드 장착 모델 권장)",
    colorGuide: {
      clear: "미미즈(지렁이 컬러), 시나몬, 워터멜론 레드플레이크",
      stained: "그린펌킨 블루플레이크, 콜라(Cola), 플럼(자두색)",
      muddy: "준버그, 블랙/레드, 모닝던(형광 핑크)"
    },
    actionType: "soft_mid",
    timeTip: {
      dawn_dusk: "석축이나 좌대 주변에 붙은 배스에게 폴링 후 연속 쉐이킹을 주면 양 끝단이 강하게 파르르 떨리며 바이트를 유도합니다.",
      midday: "배스가 바닥에서 살짝 떠 있거나 교각·수몰나무 기둥에 붙어 있는 한낮에 수직 폴링으로 눈앞을 지나가게 하면 백발백중입니다.",
      night: "어두운 밤에도 웜 전체가 물을 밀어내는 파동이 커서 가로등 불빛 주변이나 석축 연안에서 마릿수 타작이 가능합니다."
    },
    desc: "스트레이트 웜의 중앙(와키)에 지그헤드를 꽂아 폴링 시 양 끝이 자벌레처럼 꿈틀거리며 강한 수류 파동을 만드는 BFS 마릿수 최강 채비입니다."
  },
  {
    id: "neko_rig",
    name: "네꼬리그 (Neko Rig)",
    category: "SOFT",
    catLabel: "소프트베이트",
    bfsFriendly: true,
    depthRange: [1.0, 3.2],
    depthText: "0.8 ~ 3.5m (바닥/브레이크)",
    tempRange: [8, 26],
    bestSeasons: ["spring", "summer", "autumn", "winter"],
    bestStruct: ["rock_slope", "heavy_cover", "shallow_weed"],
    bestWind: ["calm", "moderate"],
    bestTime: ["midday", "dawn_dusk"],
    bestClarity: ["clear", "stained"],
    vibration: 48,
    snagRes: 75,
    speed: "바닥 호핑 & 제자리 쉐이킹",
    bfsSpec: "4~5인치 스트레이트웜 + 1/32~1/16oz 네일싱커 (L 로드 + 카본 6~7lb)",
    stdSpec: "5.5~6.5인치 스트레이트웜 + 1/16~3/32oz 네일싱커 (ML~M 로드)",
    hookGuide: "모스키토/와키 훅 #2 ~ #1 + 웜 튜브(O링) 사용 시 웜 손실 방지 | 네일싱커 0.9g ~ 2.2g",
    colorGuide: {
      clear: "미미즈(지렁이), 그린펌킨 페퍼, 스모크 시드",
      stained: "그린펌킨 차트 팁, 옥수수(투톤), 스카파논",
      muddy: "블랙&블루, 준버그, 다크 시나몬"
    },
    actionType: "soft_neko",
    timeTip: {
      dawn_dusk: "무빙 루어로 훑고 지나간 자리를 네꼬리그로 다시 한번 꼼꼼히 찍어주면 남아있던 배스를 마저 낚아낼 수 있습니다.",
      midday: "피딩이 끝난 한낮 터프 컨디션에서 석축 돌 틈을 하나하나 더듬으며 제자리 쉐이킹을 줄 때 진가가 드러납니다.",
      night: "바닥 지형이 익숙한 석축 포인트라면 야간에도 슬로우 드래깅과 스테이로 준수한 조과를 냅니다."
    },
    desc: "머리 쪽에 네일싱커를 박아 바닥에서 먹이를 쪼아 먹는 베이트피쉬/지렁이를 완벽히 재현합니다. 이동 거리를 줄이고 바르르 떨어주면 사계절 마릿수를 보장합니다."
  },
  {
    id: "downshot_rig",
    name: "다운샷 리그 (Drop Shot)",
    category: "SOFT",
    catLabel: "소프트베이트",
    bfsFriendly: true,
    depthRange: [1.8, 4.2],
    depthText: "1.5 ~ 4.5m+ (특정 층 고정)",
    tempRange: [5, 25],
    bestSeasons: ["winter", "spring", "autumn", "summer"],
    bestStruct: ["rock_slope", "deep_open"],
    bestWind: ["calm", "moderate"],
    bestTime: ["midday", "dawn_dusk"],
    bestClarity: ["clear", "stained"],
    vibration: 30,
    snagRes: 70,
    speed: "제자리 스테이 & 미세 쉐이킹",
    bfsSpec: "2.5~3.5인치 핀테일/소형웜 + 2.5g~5g 싱커 (UL~L 로드 + 카본 5~6lb)",
    stdSpec: "3.5~4.5인치 웜 + 5g~10g 헤비 다운샷(석축/수초 직공) (ML~M 로드)",
    hookGuide: "다운샷 전용 마스바리 #2~#1 또는 오프셋 #2~#1/0 | 단차: 겨울 10~15cm, 봄·가을 20~35cm",
    colorGuide: {
      clear: "와카사기, 프리즘 샤드, 워터멜론 프로블루",
      stained: "그린펌킨 골드플레이크, 모닝던, 고비(밀어 컬러)",
      muddy: "차트루즈 샤드, 블랙 네온"
    },
    actionType: "soft_downshot",
    timeTip: {
      dawn_dusk: "수온이 낮은 날 아침, 브레이크라인 턱에 싱커를 걸어두고 흔들어주면 입을 닫은 배스도 결국 참지 못하고 뭅니다.",
      midday: "한낮 고기압이나 낚시꾼이 많이 다녀간 하이 프레셔 상황에서 꽝을 면하게 해주는 최후의 보루입니다.",
      night: "어두운 밤에는 단차 엉킴 관리가 번거롭고 어필 범위가 좁아 프리리그나 지그헤드가 더 편리합니다."
    },
    desc: "싱커가 바닥에 닿아 있어도 웜은 단차(15~30cm)만큼 수중에 떠 있어, 바닥 걸림을 피하면서도 한 자리에서 끈질기게 배스를 유혹합니다."
  },
  {
    id: "free_rig",
    name: "프리리그 (Free Rig)",
    category: "SOFT",
    catLabel: "소프트베이트",
    bfsFriendly: true,
    depthRange: [1.5, 4.0],
    depthText: "1.2 ~ 4.5m (바닥 탐색)",
    tempRange: [8, 28],
    bestSeasons: ["spring", "summer", "autumn", "winter"],
    bestStruct: ["rock_slope", "deep_open", "heavy_cover"],
    bestWind: ["calm", "moderate", "strong"],
    bestTime: ["midday", "dawn_dusk", "night"],
    bestClarity: ["stained", "clear", "muddy"],
    vibration: 55,
    snagRes: 88,
    speed: "폴링 후 드래깅 / 호핑",
    bfsSpec: "2.5~3인치 호그/가재웜 + 3.5g~5g 고리봉돌 (L~ML 로드 + 카본 6~8lb)",
    stdSpec: "3.5~4인치 호그/크로우/더블테일 + 7g~14g 고리봉돌 (M~MH 로드 + 카본 12~14lb)",
    hookGuide: "2.5~3인치: 오프셋 #1~#1/0 | 3.5인치: #2/0 | 4인치: #3/0~#4/0 | 싱커: 3.5g(1/8oz)~14g(1/2oz)",
    colorGuide: {
      clear: "그린펌킨 페퍼, 워터멜론 시드, 내추럴 크로우",
      stained: "그린펌킨 블루플레이크, 레드플레이크(봄), 시나몬",
      muddy: "블랙&블루, 준버그(보라+초록 펄)"
    },
    actionType: "soft_freerig",
    timeTip: {
      dawn_dusk: "장타로 먼 거리 브레이크라인이나 물골을 직공해 고리봉돌이 바닥을 찍은 직후의 무중력 폴링 바이트를 노리세요.",
      midday: "한낮 깊은 수심이나 커버 주변 바닥을 천천히 질질 끌어주는(Dragging) 운용이 가장 안정적입니다.",
      night: "야간 바닥 낚시 넘버원 채비입니다. 가재/호그 웜이나 컬리테일 웜을 달아 천천히 바닥을 긁어주면 대물 배스가 강하게 가져갑니다."
    },
    desc: "고리봉돌이 먼저 빠르게 바닥을 찍고, 그 뒤를 따라 웜이 무중력 상태(노싱커 효과)로 천천히 폴링하는 대한민국 국민 올라운드 채비입니다."
  },
  {
    id: "mid_strolling",
    name: "미드스트롤링 / 호버스트롤링",
    category: "SOFT",
    catLabel: "소프트베이트",
    bfsFriendly: true,
    depthRange: [0.8, 2.5],
    depthText: "0.8 ~ 2.8m (중층 유영)",
    tempRange: [6, 20],
    bestSeasons: ["spring", "autumn", "winter"],
    bestStruct: ["deep_open", "rock_slope"],
    bestWind: ["calm", "moderate"],
    bestTime: ["midday", "dawn_dusk"],
    bestClarity: ["clear", "stained"],
    vibration: 40,
    snagRes: 60,
    speed: "라인 슬랙 쉐이킹 + 정속 릴링",
    bfsSpec: "3~3.5인치 리얼 섀드웜 + 0.9g~1.8g 롤링 지그헤드 (UL~L 로드 + 카본 4~6lb)",
    stdSpec: "스피닝 UL~L 태클 또는 극피네스 BFS 전용 (호버스트롤링은 0.3~0.9g 네일싱커)",
    hookGuide: "무게중심이 위쪽에 있는 미드 전용 90도 아이라인 지그헤드 (1/32oz 0.9g ~ 3/64oz 1.3g)",
    colorGuide: {
      clear: "리얼 와카사기(빙어), 고스트 미노우, 내추럴 프로블루",
      stained: "핑크 백 실버, 골드 플래시 샤드, 스모크 라임",
      muddy: "화이트 펄, 차트루즈 팁 (탁수에서는 일반 섀드웜 스위밍 권장)"
    },
    actionType: "soft_mid",
    timeTip: {
      dawn_dusk: "베이트피쉬를 따라 중층에 떠 있는 배스에게 일정한 수심층을 유지하며 롤링 파동을 보여주면 그대로 삼킵니다.",
      midday: "맑은 날 한낮에 바닥 채비도 안 먹고 탑워터도 안 나오는 '서스펜딩(중층 떠 있음)' 배스를 저격하는 현대 피네스 기술입니다.",
      night: "라인 슬랙 조절과 수심 유지가 까다로워 야간에는 일반 지그헤드 정속 스위밍으로 전환하는 것이 좋습니다."
    },
    desc: "바닥에도 수면에도 붙지 않고 중층(Mid)에 붕 떠 있는 까다로운 배스를 공략합니다. 라인 슬랙을 튕겨주며 감으면 웜이 좌우 롤링과 플래싱을 연출합니다."
  },
  {
    id: "swimbait_shad",
    name: "섀드웜 스위밍 (지그헤드 / 밸리후크)",
    category: "SOFT",
    catLabel: "소프트베이트",
    bfsFriendly: true,
    depthRange: [0.6, 2.5],
    depthText: "0.5 ~ 3.0m (중층/바닥)",
    tempRange: [12, 26],
    bestSeasons: ["autumn", "spring", "summer"],
    bestStruct: ["shallow_weed", "rock_slope", "deep_open"],
    bestWind: ["calm", "moderate", "strong"],
    bestTime: ["dawn_dusk", "night", "midday"],
    bestClarity: ["clear", "stained", "muddy"],
    vibration: 68,
    snagRes: 75,
    speed: "일정한 릴링 (Steady Retrieve)",
    bfsSpec: "2.8~3.5인치 섀드웜 + 1.8g~3.5g 지그헤드/언더스핀 (L~ML 로드)",
    stdSpec: "4~5인치 섀드웜 + 웨이티드 오프셋 훅(#3/0~#5/0, 3.5~7g) (M~MH 로드)",
    hookGuide: "오픈워터: 지그헤드 1/16~1/8oz | 수초/커버: 밸리웨이티드 오프셋 훅 #2/0~#5/0",
    colorGuide: {
      clear: "아유(은어), 스모크 샤드, 워터멜론 시드",
      stained: "펄 화이트, 일렉트릭 샤드, 그린펌킨 차트",
      muddy: "차트루즈 펄, 다크 슬리퍼, 블랙 블루"
    },
    actionType: "soft_swim",
    timeTip: {
      dawn_dusk: "하드베이트를 쫓아오다 돌아가는 배스에게 섀드웜 스위밍을 던져주면 이물감 없이 단번에 바이트가 들어옵니다.",
      midday: "언더스핀(블레이드 달린 훅)과 조합해 수초 엣지나 브레이크라인 중층을 훑어주면 한낮에도 반응이 빠릅니다.",
      night: "야간 석축이나 가로등 포인트에서 3.5~4인치 섀드웜을 일정한 속도로 감아들이기만 해도 손쉽게 입질을 받습니다."
    },
    desc: "하드베이트의 강한 파동에 부담을 느끼는 배스에게 부드럽고 자연스러운 꼬리 파동(Thumping)으로 어필하는 소프트 무빙 루어입니다."
  },
  {
    id: "rubber_jig",
    name: "러버지그 / 스몰 러버지그 (스모러버)",
    category: "SOFT",
    catLabel: "소프트베이트",
    bfsFriendly: true,
    depthRange: [1.0, 3.8],
    depthText: "0.8 ~ 4.0m (커버/바닥)",
    tempRange: [6, 28],
    bestSeasons: ["spring", "summer", "autumn", "winter"],
    bestStruct: ["heavy_cover", "rock_slope"],
    bestWind: ["calm", "moderate", "strong"],
    bestTime: ["midday", "night", "dawn_dusk"],
    bestClarity: ["stained", "muddy", "clear"],
    vibration: 52,
    snagRes: 90,
    speed: "바닥 범핑 & 스테이 시 스커트 플레어링",
    bfsSpec: "1.8g~3.5g 스몰 러버지그(스모러버) + 2.5인치 호그/새우 트레일러 (L 로드)",
    stdSpec: "3/8oz~1/2oz 커버 러버지그 + 3.5~4인치 크로우/청크 트레일러 (MH~H 로드)",
    hookGuide: "브러쉬 가드(솔)를 현장 장애물 밀도에 맞춰 2~4가닥 솎아내거나 부채꼴로 펼쳐 사용",
    colorGuide: {
      clear: "그린펌킨, 브라운/퍼플(가재색), 모스 그린",
      stained: "그린펌킨 블루, 오렌지 크로우, 시나몬",
      muddy: "블랙&블루(런커 선별 최강 컬러), 블랙&레드"
    },
    actionType: "soft_jig",
    timeTip: {
      dawn_dusk: "연안 수몰나무나 바위 틈새에 바짝 붙여 폴링 바이트를 노리세요.",
      midday: "햇빛이 가장 강한 한낮, 수몰나무 가장 깊숙한 그늘 속에 피칭으로 찔러 넣으면 런커 배스가 주저 없이 덥석 물고 나옵니다.",
      night: "어두운 밤에는 물속에서 실루엣이 가장 뚜렷하게 보이는 블랙/블루 컬러 러버지그가 대물 선별에 탁월합니다."
    },
    desc: "실리콘 스커트가 물속에서 우산처럼 펴졌다 오므라들며 볼륨감과 생명력을 동시에 부여합니다. 가드가 달려 있어 헤비 커버를 과감하게 직공합니다."
  }
];

// === 3. 물색 & 조도별 루어 컬러 팔레트 추천 매트릭스 ===
const COLOR_PALETTE_GUIDE = {
  clear: {
    label: "맑음 (Clear / 시야 1.5m+)",
    summary: "배스의 시각 의존도가 극대화됩니다. 인위적인 반사광이나 과도한 형광색보다 물속에 녹아드는 내추럴·반투명(Ghost) 컬러가 유리합니다.",
    swatches: [
      { name: "워터멜론 시드", hex: "#4d7c0f", sub: "맑은 물 한낮 1순위" },
      { name: "그린펌킨 페퍼", hex: "#3f6212", sub: "사계절 올라운드" },
      { name: "고스트 와카사기", hex: "#94a3b8", sub: "하드베이트/미드" },
      { name: "미미즈 (지렁이)", hex: "#b45309", sub: "네꼬/카이젤 특효" }
    ]
  },
  stained: {
    label: "보통 / 살짝 탁함 (Stained / 녹조·수초물)",
    summary: "시각과 측선(파동)을 동시에 자극해야 합니다. 기본 내추럴 컬러에 블루/골드 펄이나 차트루즈(형광) 포인트가 들어간 투톤 컬러가 최고입니다.",
    swatches: [
      { name: "그린펌킨 블루펄", hex: "#1e3a8a", sub: "중탁수 바닥 1순위" },
      { name: "화이트 & 차트루즈", hex: "#bef264", sub: "스피너/채터베이트" },
      { name: "레드 크로우", hex: "#dc2626", sub: "봄철/석축 크랭킹" },
      { name: "골드 블랙 백", hex: "#eab308", sub: "플래싱 어필" }
    ]
  },
  muddy: {
    label: "탁수 / 흙탕물 (Muddy / 시야 30cm 이하)",
    summary: "빛이 투과하지 못하므로 물속에서 오히려 가장 뚜렷한 대비(Contrast) 실루엣을 만드는 '검정/보라' 계열이나 강한 '형광 차트'가 정답입니다.",
    swatches: [
      { name: "블랙 & 블루", hex: "#172554", sub: "탁수·야간 런커 1티어" },
      { name: "준버그 (보라+펄)", hex: "#581c87", sub: "웜 채비 탁수 특효" },
      { name: "파이어타이거", hex: "#84cc16", sub: "강풍·탁수 하드베이트" },
      { name: "매트 블랙", hex: "#090d16", sub: "버즈베이트/프로그" }
    ]
  }
};

// === 4. 현장 즉시 참고용 싱커 무게 & 훅 & 수온 치트시트 ===
const SINKER_CHART = [
  { oz: "1/32 oz", gram: "0.9 g", use: "카이젤리그, 네꼬리그, 호버/미드스트롤링" },
  { oz: "1/20 oz", gram: "1.4 g", use: "네꼬리그 표준, 미드스트롤링 지그헤드" },
  { oz: "1/16 oz", gram: "1.8 g", use: "지그헤드 스위밍, 경량 카이젤, 스모러버" },
  { oz: "3/32 oz", gram: "2.7 g", use: "BFS 다운샷, 스몰 러버지그, 경량 프리리그" },
  { oz: "1/8 oz", gram: "3.5 g", use: "BFS 프리리그, 스피닝 다운샷 표준" },
  { oz: "3/16 oz", gram: "5.3 g", use: "베이트 피네스/올라운드 프리리그 & 다운샷" },
  { oz: "1/4 oz", gram: "7.0 g", use: "표준 프리리그, 텍사스리그, 소형 스피너베이트" },
  { oz: "3/8 oz", gram: "10.5 g", use: "장타 프리리그, 스피너/채터/러버지그 국민 무게" },
  { oz: "1/2 oz", gram: "14.0 g", use: "급심·강풍 프리리그, 헤비 커버 펀칭, 딥크랭크" }
];

const WATER_TEMP_PATTERNS = [
  { range: "4°C ~ 8°C", title: "❄️ 한겨울 저수온 딥 스쿨링", desc: "배스 신진대사 최저. 수심이 가장 깊은 본류 딥채널·댐 하류 돌무더기에 집단 스쿨링. 메탈바이브 짧은 리프트앤폴, 롱스테이 다운샷으로 눈앞 직공." },
  { range: "9°C ~ 13°C", title: "🌱 초봄 프리 스폰 / 늦가을 둔화기", desc: "일조량이 좋은 북서쪽 사면 석축과 1차 브레이크라인으로 빅배스 올라붙음. 서스펜딩 섀드, 저크베이트 롱스테이, 프리리그 슬로우 드래깅." },
  { range: "14°C ~ 18°C", title: "🌸 산란기(Spawn) & 🍁 가을 턴오버 피딩", desc: "연중 배스가 연안 쉘로우에 가장 많이 들어오는 골든 수온! 봄에는 네꼬/다운샷 산란장 공략, 가을에는 스피너/채터/크랭크 등 빠른 무빙 루어 마릿수 폭발." },
  { range: "19°C ~ 24°C", title: "🌿 포스트 스폰 회복기 & 초여름 폭풍 활성", desc: "수초가 자라나고 베이트피쉬가 넘쳐남. 탑워터(포퍼/펜슬), 노싱커 폴링, 섀드웜 스위밍, 채터베이트 등 전 영역 루어에 거칠게 반응." },
  { range: "25°C ~ 30°C+", title: "☀️ 한여름 고수온 & 수온약층(Thermocline)", desc: "용존산소량 부족으로 새벽/야간 피딩 집중. 한낮에는 새물유입구(인렛), 마름 수초 매트 그늘(프로그/러버지그), 혹은 수심 3m 수온약층 브레이크 공략." }
];
