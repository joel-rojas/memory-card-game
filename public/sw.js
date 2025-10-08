const STATIC_FILES = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/manifest.json",
  "/src/index.css",
  "/src/main.tsx",
  "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap",
];

const STATIC_VERSION = "static-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_VERSION).then((cache) => {
      return cache.addAll(STATIC_FILES);
    })
  );
});

self.addEventListener("activate", (event) => {
  return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
