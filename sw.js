var CACHE_NAME = 'caleg-cache-v3';
var urlsToCache = [
  '/',
  '/data/*',
  // '/data/caleg.json',
  '/css/bootstrap.min.css',
  '/css/materialize.min.css',
  '/css/style.css',
  '/fonts/MaterialIcons-Regular.woff2',
  '/img/bg.jpg',
  '/img/bgprof.jpg',
  '/img/favicon.ico',
  '/img/logo.png',
  '/img/kpu.png',
  '/img/logo_simpang_300x300px.png',
  '/img/icons-128.png',
  '/img/icons-144.png',
  '/img/icons-152.png',
  '/img/icons-192.png',
  '/img/icons-384.png',
  '/img/icons-512.png',
  '/img/icons-72.png',
  '/img/icons-96.png',
  '/js/jquery.js',
  '/js/materialize.min.js',
  '/js/portabel.js',
  '/js/firebase.js',
  // '/js/main.js',
  // '/js/calegview.js',
  // '/sw.js',
  // '/index.html',
  // '/calegview.html',
  // '/manifest.json'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Install '+CACHE_NAME+' ke cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {

  var request=event.request
  var url=new URL(request.url) 
  //misahin request dari URL dan internal cache
  if(url.origin === location.origin){
    event.respondWith(
      caches.match(request).then(function(response){
        // console.log('url.origin === location.origin')
        return response || fetch(request)
      })
    )
  }else{
    event.respondWith(
      caches.open('caleg-cache').then(function(cache){
        return fetch(request).then(function(liveResponse){
          cache.put(request, liveResponse.clone())
          console.log('data '+request+' kesimpen ke cache')
          return liveResponse
        }).catch(async function(){
          const response = await caches.match(request);
          if (response)
            return response;
          // console.log('ambil cache caleg.json');
          return caches.match('data/caleg.json');
        })
      })

    )
  }
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName){
          return cacheName != CACHE_NAME
        }).map(function(cacheName) {
          return caches.delete(cacheName)
          console.log('cache kehapus')
        })
      );
    })
  );
});