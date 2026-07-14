// ALA OS service worker — guarantees an always-fresh page.
// Page navigations are fetched network-first with cache:no-store, so the browser can
// never serve a stale cached copy of the hub. Cache is used only as an offline fallback.
self.addEventListener('install', function(e){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function(e){
  var req = e.request;
  if (req.method === 'GET' && req.mode === 'navigate') {
    e.respondWith(
      fetch(new Request(req.url, { cache: 'no-store' })).catch(function(){ return caches.match(req); })
    );
  }
});
