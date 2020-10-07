const CACHE_NAME = "firstpwa-v4";
const urlsToCache = [
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
  "js/sw-register.js",
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
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff?v=4.7.0",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf?v=4.7.0"
];
 
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then( cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", event => {
event.waitUntil(
    caches.keys().then(cacheNames => {
    return Promise.all(
        cacheNames.map(cacheName => {
        if (cacheName != CACHE_NAME) {
            console.log(`ServiceWorker: cache  ${cacheName}  dihapus`);
            return caches.delete(cacheName);
        }
        })
    );
    })
);
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(response => {
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