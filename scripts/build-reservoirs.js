// 한국농어촌공사(RAWRIS) 계측 저수지 목록 스캔 + 주소 지오코딩 1회성 빌드 스크립트
// 사용법:
//   node scripts/build-reservoirs.js scan [from] [to]   -> data/reservoirs-scan.json (equip_no 스캔)
//   node scripts/build-reservoirs.js geocode [minStorage] -> data/reservoirs.json + js/reservoirs-data.js
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SCAN_PATH = path.join(ROOT, "data", "reservoirs-scan.json");
const OUT_JSON = path.join(ROOT, "data", "reservoirs.json");
const OUT_JS = path.join(ROOT, "js", "reservoirs-data.js");
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fetchEquip(n) {
  const url = `https://rawris-am.ekr.or.kr/wrms/query/json?qid=rawris.wrms.gis.popup.view_info_reservoir&db_type=undefined&equip_no=${n}`;
  for (let t = 0; t < 3; t++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA } });
      if (!res.ok) throw new Error(res.status);
      const txt = await res.text();
      if (!txt.trim()) return null;
      const rows = JSON.parse(txt);
      return rows && rows[0] && rows[0].equip_name ? rows[0] : null;
    } catch (e) {
      await sleep(300 * (t + 1));
    }
  }
  return null;
}

async function scan(from, to) {
  const found = fs.existsSync(SCAN_PATH) ? JSON.parse(fs.readFileSync(SCAN_PATH, "utf8")) : {};
  const nums = [];
  for (let n = from; n <= to; n++) if (!found[n]) nums.push(n);
  let idx = 0;
  async function worker() {
    while (idx < nums.length) {
      const n = nums[idx++];
      const r = await fetchEquip(n);
      if (r) {
        found[n] = {
          equipNo: n,
          name: String(r.equip_name).replace(/\s*\(.*?\)/g, "").trim(),
          head: r.buseo_head_name,
          branch: r.buseo_branch_name,
          addr: r.equip_addr1,
          total: Number(r.r_total_storage) || 0,
          full: r.r_level_full
        };
      }
      if (idx % 500 === 0) console.log(`scanned ${idx}/${nums.length}, found ${Object.keys(found).length}`);
    }
  }
  await Promise.all(Array.from({ length: 6 }, worker));
  fs.writeFileSync(SCAN_PATH, JSON.stringify(found, null, 1), "utf8");
  console.log(`done: ${Object.keys(found).length} reservoirs -> ${SCAN_PATH}`);
}

async function geocode(addr) {
  // Nominatim 사용 정책: 초당 1회 이하, UA 명시
  const q = encodeURIComponent(addr);
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=kr&q=${q}`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "bass-fishing-app-build/1.0" } });
    const arr = await res.json();
    if (arr && arr[0]) return { lat: +arr[0].lat, lon: +arr[0].lon };
  } catch (e) { /* ignore */ }
  return null;
}

async function build(minStorage) {
  const scanned = JSON.parse(fs.readFileSync(SCAN_PATH, "utf8"));
  // 프리셋 좌표 우선 (js/lures-data.js 의 KOREA_SPOTS)
  const src = fs.readFileSync(path.join(ROOT, "js", "lures-data.js"), "utf8");
  const presets = [];
  const re = /id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*lat:\s*([\d.]+),\s*lon:\s*([\d.]+),\s*equipNo:\s*(\d+)/g;
  let m;
  while ((m = re.exec(src))) presets.push({ id: m[1], name: m[2], lat: +m[3], lon: +m[4], equipNo: +m[5] });

  const prev = fs.existsSync(OUT_JSON) ? JSON.parse(fs.readFileSync(OUT_JSON, "utf8")) : [];
  const cache = Object.fromEntries(prev.map(r => [r.equipNo, r]));
  const out = [];
  const failed = [];
  const cands = Object.values(scanned).filter(r => r.total >= minStorage || presets.some(p => p.equipNo === r.equipNo));
  console.log(`candidates: ${cands.length}`);
  for (const r of cands) {
    const preset = presets.find(p => p.equipNo === r.equipNo);
    let pos = preset ? { lat: preset.lat, lon: preset.lon } : null;
    if (!pos && cache[r.equipNo]) pos = { lat: cache[r.equipNo].lat, lon: cache[r.equipNo].lon };
    if (!pos) {
      pos = await geocode(`${r.addr}`);
      await sleep(1100);
      if (!pos) pos = await geocode(`${r.addr.split(" ").slice(0, 3).join(" ")}`); // 읍/면 단위 폴백
      await sleep(1100);
    }
    if (!pos || pos.lat < 33 || pos.lat > 39 || pos.lon < 124 || pos.lon > 132) { failed.push(r); continue; }
    out.push({
      equipNo: r.equipNo,
      name: preset ? preset.name : `${r.head} ${r.branch} ${r.name}`,
      shortName: r.name,
      addr: r.addr,
      total: r.total,
      lat: +pos.lat.toFixed(4),
      lon: +pos.lon.toFixed(4),
      ...(preset ? { presetId: preset.id } : {})
    });
  }
  fs.writeFileSync(OUT_JSON, JSON.stringify(out, null, 1), "utf8");
  fs.writeFileSync(OUT_JS, `// 낚시 가능 주요 RAWRIS 계측 저수지 목록 (좌표 포함, scripts/build-reservoirs.js 로 생성)\nwindow.RAWRIS_RESERVOIRS = ${JSON.stringify(out)};\n`, "utf8");
  console.log(`saved ${out.length}, failed ${failed.length}`);
  failed.forEach(f => console.log("FAILED", f.equipNo, f.name, f.addr));
}

const [cmd, a, b] = process.argv.slice(2);
if (cmd === "scan") scan(+(a || 1), +(b || 6000));
else if (cmd === "geocode") build(+(a || 500));
else console.log("usage: scan [from] [to] | geocode [minStorage]");
