const CACHE_NAME = 'offline-cache-v1';
const urlsToCache = [
  '/',                // Cache the root page
  '/offline',         // Cache the offline fallback page
  '/_next/static/chunks/app/layout.js', // Cache critical JS (adjust after build)
  '/_next/static/css/styles.css',       // Cache styles if applicable (adjust path)
];

// Install: Cache the specified resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch((error) => {
        console.error('Cache failed:', error);
      });
    })
  );
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

// Fetch: Serve cached content or fallback to offline page
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful network responses dynamically
        if (event.request.method === 'GET') {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          return cachedResponse || caches.match('/offline');
        });
      })
  );
});