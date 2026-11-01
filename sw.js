// 배스 전략 (Bass Tactics) Service Worker
const CACHE_NAME = 'basstactics-v1.3.0';

const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './js/lures-data.js',
  './js/water-levels-data.js',
  './js/reservoirs-data.js',
  './js/weather-api.js',
  './js/tactic-engine.js',
  './js/expert-rules-data.js',
  './js/expert-engine.js',
  './js/app.js',
  './data/reservoirs.json',
  './data/water-levels.json',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];

// 1. 설치 (Install): 핵심 리소스 사전 캐싱
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// 2. 활성화 (Activate): 구버전 캐시 정리 및 즉시 제어
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. 네트워크 요청 처리 (Fetch)
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // GET 요청만 처리
  if (req.method !== 'GET') return;

  // 외부 API 요청 (Open-Meteo, 공공데이터 등) -> Network First (실시간 데이터 우선, 실패 시 캐시 폴백)
  if (url.origin !== self.location.origin) {
    event.respondWith(
      fetch(req)
        .then((response) => {
          if (response && response.status === 200) {
            const resClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          }
          return response;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // 내부 정적 자원 -> Stale-While-Revalidate 전략
  // 캐시가 있으면 즉시 빠르게 반환하고, 백그라운드에서 최신 버전으로 캐시 갱신
  event.respondWith(
    caches.match(req).then((cachedResponse) => {
      const fetchPromise = fetch(req)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const resClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
