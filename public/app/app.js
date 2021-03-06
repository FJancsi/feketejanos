import fetchApi from './fetch/fetchApi.js';

(function () {
	'use strict';

	const repoName = 'FJancsi';

	if (!('indexedDB' in window)) {
		console.log('This browser doesn\'t support IndexedDB');
		return;
	}

	if (!('fetch' in window)) {
		console.log('Fetch API not found, try including the polyfill');
		return;
	}

	if (!('serviceWorker' in navigator)) {
		console.log('Service worker not supported');
		return;
	}

	navigator.serviceWorker.register('service-worker.js')
		.then(registration => {
			console.log(`Registered at scope: ${registration.scope}`);
		})
		.catch(error => {
			console.log(`Registration failed: ${error}`);
		});

	fetchApi.fetchGitRepos(repoName);
})();
