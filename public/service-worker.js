(function () {
	'use strict';

	const filesToCache = [
		'.',
		'style.css',
		'index.html',
		'pages/404.html',
		'pages/offline.html',
		'app/app.js',
		'https://fonts.googleapis.com/css?family=Orbitron'
	];

	const staticCacheName = 'pages-cache-v2';
	const notToCache = 'https://api.github.com';

	self.addEventListener('install', event => {
		console.log('Attempting to install service worker and cache static assets');
		//self.skipWaiting();
		event.waitUntil(
			caches.open(staticCacheName)
				.then(cache => {
					return cache.addAll(filesToCache);
				})
		);
	});

	self.addEventListener('activate', event => {
		console.log('Service worker activating...');
		let cacheWhitelist = [staticCacheName];

		event.waitUntil(
			caches.keys()
				.then(cacheNames => {
					return Promise.all(
						cacheNames.map(cacheName => {
							if (cacheWhitelist.indexOf(cacheName) === -1) {
								return caches.delete(cacheName);
							}
						})
					);
				})
		);
	});

	self.addEventListener('fetch', event => {
		console.log(`Fetching: ${event.request.url}`);
		if (event.request.url.startsWith(notToCache)) {return event.request;}
		event.respondWith(
			caches.match(event.request)
				.then(response => {
					if (response) {
						console.log(`Found ${event.request.url} in cache`);
						return response;
					}
					console.log(`Network request for ${event.request.url}`);
					return fetch(event.request)
						.then(response => {
							if (response.status === 404) {
								return caches.match('pages/404.html');
							}
							return caches.open(staticCacheName)
								.then(cache => {
									cache.put(event.request.url, response.clone());
								});
						});
				})
				.catch(error => {
					console.log(`Error: ${error}`);
					return caches.match('pages/offline.html');
				})
		);
	});
})();
