const MsaCacheName = "msa-cache-v1";
const assets = [
  "/",
  "index.html",
  "css/style.css",
  "js/app.js"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(MsaCacheName)
    .then((cache) => {
        cache.addAll(assets);
    })
    .then(() => {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("fetch", (fetchEvent) => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})