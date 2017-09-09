(function () {
	'use strict';

	const filesToCache = [
		'.',
		'style/app.css',
		'index.html',
		'favicon.ico',
		'pages/404.html',
		'pages/offline.html',
		'style/font/HmnHiRzvcnQr8CjBje6GQvesZW2xOQ-xsNqO47m55DA.woff2',
		'images/touch/icon-192x192.png'
	];

	const staticCacheName = 'pages-cache-v1';
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
		if (event.request.url.startsWith(notToCache)) { return event.request; }
		event.respondWith(
			caches.match(event.request)
				.then(response => {
					if (response) { console.log(`Found ${event.request.url} in cache`); }
					return response || fetchAndCache(event.request);
				})
		);
	});

	function fetchAndCache(url) {
		console.log(`Network request for ${url.url}`);
		return fetch(url)
			.then(response => {
				if (!response.ok) {
					if (response.status === 404) {
						return caches.match('pages/404.html');
					}
					throw Error(response.statusText);
				}
				return caches.open(staticCacheName)
					.then(cache => {
						cache.put(url, response.clone());
						return response;
					});
			})
			.catch(error => {
				console.log(`Request failed: ${error}`);
				return caches.match('pages/offline.html');
			})
	}
})();
