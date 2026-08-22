/* FLAMES Service Worker v1.0.3
   - Network-first for HTML
   - Cache-first for static assets
   - Versioned cache with automatic cleanup
*/
const CACHE_VERSION = 'flames-v1.0.3';
const ASSETS = ['./','./index.html','./manifest.json','./css/style.css','./js/app.js','./assets/icons/favicon.svg','./assets/icons/icon-192.png','./assets/icons/icon-512.png','./assets/icons/maskable-512.png'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE_VERSION).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const isHTML = (req.headers.get('accept') || '').includes('text/html');
  if (isHTML) {
    event.respondWith(fetch(req, { cache: 'no-store' }).then(res => { const copy = res.clone(); caches.open(CACHE_VERSION).then(c => c.put(req, copy)); return res; }).catch(() => caches.match(req).then(r => r || caches.match('./index.html'))));
  } else {
    event.respondWith(caches.match(req).then(cached => cached || fetch(req).then(res => { if (res && res.status === 200 && res.type === 'basic') { const copy = res.clone(); caches.open(CACHE_VERSION).then(c => c.put(req, copy)); } return res; })));
  }
});
