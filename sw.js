const CACHE_NAME = 'fedyj-tutorial-v2';
const APP_SHELL = [
  './',
  './index.html',
  './maths.html',
  './physics.html',
  './chemistry.html',
  './past-papers.html',
  './styles.css',
  './app.js',
  './search.js',
  './search-index.json',
  './maths-triangles.html',
  './maths-circles.html',
  './maths-algebra.html',
  './physics-mechanics.html',
  './physics-electricity.html',
  './physics-waves.html',
  './chemistry-periodic-table.html',
  './chemistry-bonding.html',
  './chemistry-acids-bases.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
        return response;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
