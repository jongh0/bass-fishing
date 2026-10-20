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

async function fetchEquipDetail(equipNo) {
  const url = `https://rawris-am.ekr.or.kr/wrms/query/json?qid=rawris.wrms.gis.popup.view_info_reservoir&db_type=undefined&equip_no=${equipNo}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
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

  const result = {
    updatedAt: new Date().toISOString(),
    equips: { ...existingEquips }
  };

  let successCount = 0;
  const uniqueEquipNos = [...new Set(TARGET_EQUIPS.map(t => t.equipNo))];
  for (const equipNo of uniqueEquipNos) {
    try {
      const info = await fetchEquipDetail(equipNo);
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
        console.log(`[OK] ${equipNo} ${info.equip_name}: 금일 ${info.now_rate}% (${info.now_wlvl} EL.m) / 전일 ${info.yday_rate}% (${info.yday_wlvl} EL.m) [${info.now_date}]`);
      }
    } catch (err) {
      console.error(`[WARN] Failed to fetch equip_no=${equipNo}:`, err.message);
    }
  }

  if (Object.keys(result.equips).length > 0) {
    fs.writeFileSync(outPath, JSON.stringify(result, null, 2), "utf8");
    const jsContent = `// 한국농어촌공사(RAWRIS) 실시간 수위 스냅샷 데이터 (네트워크/CORS 무관 즉시 로드 보장)\nwindow.RAWRIS_WATER_LEVELS = ${JSON.stringify(result, null, 2)};\n`;
    fs.writeFileSync(jsOutPath, jsContent, "utf8");
    console.log(`Saved ${Object.keys(result.equips).length} reservoir records (freshly fetched: ${successCount}) to ${outPath} and ${jsOutPath}`);
  } else {
    console.warn("[SKIP] No reservoir records available to write; keeping existing files.");
  }
}

main().catch(err => {
  console.error(err);
  process.exit(0); // CI에서 방화벽 이슈가 있어도 기존 스냅샷 유지하도록 0 종료
});
