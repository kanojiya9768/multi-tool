const CACHE_NAME = "offline-cache-v1";
const urlsToCache = [
  "/",              // Root page
  "/offline.jpg",   // Offline image (adjust to /offline.gif if needed)
  "/logo.png",      // Navbar logo
  "/favicon-196.png" // Optional: favicon
];

// Install: Pre-cache static assets
self.addEventListener("install", (evt) => {
  console.log("Service Worker installed");
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching static assets:", urlsToCache);
      return Promise.all(
        urlsToCache.map((url) => {
          return fetch(url, { mode: "no-cors" }) // Use no-cors for static assets
            .then((response) => {
              if (!response.ok) {
                console.warn(`Failed to fetch ${url}: ${response.status}`);
                return;
              }
              return cache.put(url, response);
            })
            .catch((error) => {
              console.error(`Failed to cache ${url}:`, error);
            });
        })
      ).catch((error) => {
        console.error("Install failed:", error);
        throw error;
      });
    })
  );
});

// Activate: Clean up old caches
self.addEventListener("activate", (evt) => {
  console.log("Service Worker activated");
  evt.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

// Fetch: Serve cached content or fallback
self.addEventListener("fetch", (fetchEvt) => {
  fetchEvt.respondWith(
    caches.match(fetchEvt.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(fetchEvt.request)
        .then((response) => {
          if (fetchEvt.request.method === "GET" && response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(fetchEvt.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match("/"); // Fallback to root
        });
    })
  );
});