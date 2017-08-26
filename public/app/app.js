(function () {
	'use strict';

	if (!('serviceWorker' in navigator)) {
		console.log('Service worker not supported');
		return;
	}

	if (!('fetch' in window)) {
		console.log('Fetch API not found, try including the polyfill');
		return;
	}

	navigator.serviceWorker.register('service-worker.js')
		.then(registration => {
			console.log(`Registered at scope: ${registration.scope}`);
		})
		.catch(error => {
			console.log(`Registration failed: ${error}`);
		});
})();
