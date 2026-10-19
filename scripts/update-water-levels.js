// 한국농어촌공사(RAWRIS WRMS) 실시간 저수지/담수호 수위·저수율·방류량 수집 스크립트
const fs = require("fs");
const path = require("path");

// 주요 배스 필드 RAWRIS equip_no 매핑 목록
const TARGET_EQUIPS = [
  { spotId: "asan", equipNo: 4140, label: "충남 아산호(평택호)" },
  { spotId: "pyeongtaek", equipNo: 4140, label: "경기/충남 평택호(아산호)" },
  { spotId: "yedang", equipNo: 1081, label: "충남 예산 예당호" },
  { spotId: "daeho", equipNo: 4318, label: "충남 당진 대호만" },
  { spotId: "sapgyo", equipNo: 4139, label: "충남 당진 삽교호" },
  { spotId: "gosam", equipNo: 920, label: "경기 안성 고삼지" },
  { spotId: "giheung", equipNo: 897, label: "경기 용인 기흥(신갈)지" },
  { spotId: "tapjeong", equipNo: 1046, label: "충남 논산 탑정호" },
  { spotId: "busa", equipNo: 3928, label: "충남 보령/서천 부사호" },
  { spotId: "jangseong", equipNo: 1311, label: "전남 장성호" },
  { spotId: "naju", equipNo: 1206, label: "전남 나주호" },
  { spotId: "damyang", equipNo: 1212, label: "전남 담양호" },
  { spotId: "baegun", equipNo: 1788, label: "경기 의왕 백운호수" },
  { spotId: "songjeon", equipNo: 1884, label: "경북 경주 송전지" }
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
  const result = {
    updatedAt: new Date().toISOString(),
    equips: {}
  };

  const uniqueEquipNos = [...new Set(TARGET_EQUIPS.map(t => t.equipNo))];
  for (const equipNo of uniqueEquipNos) {
    try {
      const info = await fetchEquipDetail(equipNo);
      if (info) {
        result.equips[equipNo] = info;
        console.log(`[OK] ${equipNo} ${info.equip_name}: 금일 ${info.now_rate}% (${info.now_wlvl} EL.m) / 전일 ${info.yday_rate}% (${info.yday_wlvl} EL.m) [${info.now_date}]`);
      }
    } catch (err) {
      console.error(`[WARN] Failed to fetch equip_no=${equipNo}:`, err.message);
    }
  }

  const outDir = path.join(__dirname, "..", "data");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const outPath = path.join(outDir, "water-levels.json");
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), "utf8");
  console.log(`Saved ${Object.keys(result.equips).length} reservoir records to ${outPath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(0); // CI에서 방화벽 이슈가 있어도 기존 스냅샷 유지하도록 0 종료
});
