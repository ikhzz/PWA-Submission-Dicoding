const CACHE_NAME = "firstpwa-v3";
var urlsToCache = [
  "/",
  "manifest.json",
  "index.html",
  "pages/home.html",
  "pages/topratedm.html",
  "pages/topratedtv.html",
  "pages/upcoming.html",
  "css/materialize.min.css",
  "css/materialize.css",
  "css/style.css",
  "js/materialize.min.js",
  "js/materialize.js",
  "js/script.js",
  "img/logo.JPG",
  "img/tmd3.svg",
  "img/tmdb2.svg",
  "img/maskable_192x192.png",
  "img/pwa-192x192.png",
  "img/pwa-512x512.png",
  "img/assets/Batman.jpg",
  "img/assets/kimetsu.jpg",
  "img/assets/LOTRposter.jpg",
  "img/assets/MortalKombat.jpg",
  "img/assets/Shieldhero.jpg",
  "img/assets/tenet.jpg",
  "img/assets/therental.jpg",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", function(event) {
event.waitUntil(
    caches.keys().then(function(cacheNames) {
    return Promise.all(
        cacheNames.map(function(cacheName) {
        if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
        }
        })
    );
    })
);
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }
 
        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});