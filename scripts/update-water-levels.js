// 한국농어촌공사(RAWRIS WRMS) 실시간 저수지/담수호 수위·저수율·방류량 수집 스크립트
const fs = require("fs");
const path = require("path");

// 주요 배스 필드 RAWRIS equip_no 매핑 목록
const TARGET_EQUIPS = [
  { spotId: "asan", equipNo: 4140, label: "충남 아산호" },
  { spotId: "idong", equipNo: 899, label: "경기 용인 이동저수지" },
  { spotId: "misan", equipNo: 913, label: "경기 안성 미산저수지" },
  { spotId: "gosam", equipNo: 920, label: "경기 안성 고삼저수지" },
  { spotId: "pyeongtaek", equipNo: 4140, label: "경기/충남 평택호" },
  { spotId: "sapgyo", equipNo: 4139, label: "충남 당진/아산 삽교호" },
  { spotId: "daeho", equipNo: 4318, label: "충남 당진 대호만" },
  { spotId: "yedang", equipNo: 1081, label: "충남 예산 예당호" },
  { spotId: "tapjeong", equipNo: 1046, label: "충남 논산 탑정호" },
  { spotId: "busa", equipNo: 3928, label: "충남 보령/서천 부사호" },
  { spotId: "jangseong", equipNo: 1311, label: "전남 장성호" },
  { spotId: "damyang", equipNo: 1212, label: "전남 담양호" },
  { spotId: "naju", equipNo: 1206, label: "전남 나주호" }
];

async function fetchEquipDetail(equipNo, timeoutMs = 3000) {
  const url = `https://rawris-am.ekr.or.kr/wrms/query/json?qid=rawris.wrms.gis.popup.view_info_reservoir&db_type=undefined&equip_no=${equipNo}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    },
    signal: AbortSignal.timeout(timeoutMs)
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for equip_no=${equipNo}`);
  }
  const rows = await res.json();
  return rows && rows[0] ? rows[0] : null;
}

async function main() {
  const outDir = path.join(__dirname, "..", "data");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const outPath = path.join(outDir, "water-levels.json");
  const jsOutPath = path.join(__dirname, "..", "js", "water-levels-data.js");

  // 기존 스냅샷 데이터가 있으면 먼저 로드 (해외 GitHub Actions 러너에서 한국농어촌공사 방화벽 차단 시 기존 데이터 보존)
  let existingEquips = {};
  if (fs.existsSync(outPath)) {
    try {
      const prev = JSON.parse(fs.readFileSync(outPath, "utf8"));
      if (prev && prev.equips) {
        existingEquips = prev.equips;
      }
    } catch (e) {
      // ignore parse error
    }
  }

  // 1. 한국농어촌공사(RAWRIS) 서버 사전 핑 점검 (해외 GitHub Actions 러너 방화벽 차단 시 즉시 안전 스킵)
  try {
    await fetchEquipDetail(899, 2500);
  } catch (err) {
    console.warn(`[SKIP] RAWRIS 서버에 접근할 수 없습니다 (${err.message}).`);
    console.warn(`해외 GitHub Actions 러너 방화벽 차단 환경이므로, 기존 저장된 스냅샷(${Object.keys(existingEquips).length}개 저수지)을 그대로 유지하고 배포를 진행합니다.`);
    process.exit(0);
  }

  const result = {
    updatedAt: new Date().toISOString(),
    equips: { ...existingEquips }
  };

  // 프리셋 + 내 위치 최근접 탐색용 전체 주요 저수지 목록(data/reservoirs.json)의 equip_no 모두 수집
  let reservoirNos = [];
  try {
    reservoirNos = JSON.parse(fs.readFileSync(path.join(outDir, "reservoirs.json"), "utf8")).map(r => r.equipNo);
  } catch (e) {
    // reservoirs.json 없으면 프리셋만 사용
  }
  const uniqueEquipNos = [...new Set([...TARGET_EQUIPS.map(t => t.equipNo), ...reservoirNos])];

  let successCount = 0;
  // 병렬 풀(동시 8개)로 고속 수집
  const concurrency = 8;
  let cursor = 0;

  async function worker() {
    while (cursor < uniqueEquipNos.length) {
      const idx = cursor++;
      const equipNo = uniqueEquipNos[idx];
      try {
        const info = await fetchEquipDetail(equipNo, 4000);
        if (info && info.equip_name) {
          info.equip_name = String(info.equip_name).replace(/\s*\(.*?\)/g, "").trim();
          if (info.equip_name === "대호방조제1") info.equip_name = "대호만";
          if (info.equip_addr1) {
            info.equip_addr1 = String(info.equip_addr1).replace("전남광주통합특별시", "전라남도");
          }
          if (String(equipNo) === "3928" && parseFloat(info.r_level_flood) < parseFloat(info.r_level_full)) {
            info.r_level_flood = "1.50";
          }
          result.equips[equipNo] = info;
          successCount++;
        }
      } catch (err) {
        // 개별 저수지 실패 시 기존 스냅샷 보존
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker));
  console.log(`[RAWRIS] 수집 완료: 총 ${uniqueEquipNos.length}개 중 ${successCount}개 갱신 (누적 ${Object.keys(result.equips).length}개 보존)`);

  if (Object.keys(result.equips).length > 0) {
    fs.writeFileSync(outPath, JSON.stringify(result), "utf8");
    const jsContent = `// 한국농어촌공사(RAWRIS) 실시간 수위 스냅샷 데이터 (네트워크/CORS 무관 즉시 로드 보장)\nwindow.RAWRIS_WATER_LEVELS = ${JSON.stringify(result)};\n`;
    fs.writeFileSync(jsOutPath, jsContent, "utf8");
    console.log(`Saved ${Object.keys(result.equips).length} reservoir records to ${outPath} and ${jsOutPath}`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(0); // CI에서 방화벽 이슈가 있어도 기존 스냅샷 유지하도록 0 종료
});
