/* Hold the Line service worker — caches the app shell and the ML model/wasm at runtime */
const CACHE = 'holdtheline-v2';
const SHELL = ['./index.html', './manifest.json', './icon-192.png', './icon-512.png', './icon-512-maskable.png', './apple-touch-icon.png', './privacy.html'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // runtime cache-first for the MediaPipe CDN bundle, wasm, and face model
  const isAsset =
    url.hostname === 'cdn.jsdelivr.net' ||
    url.hostname === 'storage.googleapis.com' ||
    url.origin === location.origin;
  if (e.request.method !== 'GET' || !isAsset) return;
  e.respondWith(
    caches.match(e.request).then(hit =>
      hit ||
      fetch(e.request).then(res => {
        if (res.ok || res.type === 'opaque') {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      })
    )
  );
});
