const CACHE_NAME = "teamshgt-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/styles/main.css",
  "/scripts/main.js",
  "/scripts/components/app-shell.js",
  "/scripts/components/directory-view.js",
  "/scripts/components/attendance-tools.js",
  "/scripts/components/news-board.js",
  "/scripts/components/profile-insights.js",
  "/scripts/data/employees.js",
  "/scripts/data/news.js",
  "/manifest.json",
  "/assets/icon-192.png",
  "/assets/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        return cached;
      }
      return fetch(request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      });
    })
  );
});
