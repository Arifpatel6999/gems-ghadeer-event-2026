const CACHE = 'hadees-audio-v1';

self.addEventListener('fetch', e => {
  if (!e.request.url.includes('/assets/audio/')) return;
  e.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(res => {
          cache.put(e.request, res.clone());
          return res;
        });
      })
    )
  );
});
