const cacheName = 'cache-v2';
const outDated = 'cache-v1';

const precacheResources = ['/', '/offline.html'];

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(cacheName).then(cache => cache.addAll(precacheResources)),
	);
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(cachedResponse => {
			if (cachedResponse) {
				return cachedResponse;
			}
			return fetch(event.request);
		}),
	);
});

self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames
					.filter(cacheName => cacheName === outDated)
					.map(cache => {
						return caches.delete(cache);
					}),
			);
		}),
	);
});
