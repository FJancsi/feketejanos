(function () {
	'use strict';

	var repoName = 'FJancsi';
	var repos = [];

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
		.then(function (registration) {
			console.log('Registered at scope: ' + registration.scope);
		})
		.catch(function (error) {
			console.log('Registration failed: ' + error);
		});

	var logResult = function (results) {
		results.forEach(function (result) {
			console.log('Result: ' + result);
		});
	};

	var logError = function (error) {
		console.log('Something went wrong: ' + error);
	};

	var validateResponse = function (response) {
		if (!response.ok) {
			throw new Error('Response error: ' + response.statusText);
		} else {
			return response;
		}
	};

	var responseAsJSON = function (response) {
		return response.json();
	};

	var mapResponse = function (response) {
		repos = response.map(function (item) {
			return {
				repoName: item.name,
				repoURL: item.html_url,
				repoDesc: item.description,
				repoLastUpdate: item.updated_at
			};
		});

		return repos;
	};

	var appendToDOM = function (elements) {
		var $container = document.querySelector('.section-container, .git-repos');

		elements.forEach(function (element) {
			createDOMAndAppendToParent($container, element);
		});

		return elements;
	};
	var createDOMAndAppendToParent = function (parent, element) {
		var $element = document.createElement('div');
		for (var prop in element) {
			var $elementContentContainer = document.createElement('p');
			var $elementContent = document.createTextNode(element[prop]);

			$elementContentContainer.appendChild($elementContent);
			$element.appendChild($elementContentContainer);
		}
		parent.appendChild($element);
	};

	var fetchGitRepos = function (repoName) {
		fetch('https://api.github.com/users/' + repoName + '/repos?type=owner')
			.then(validateResponse)
			.then(responseAsJSON)
			.then(mapResponse)
			//.then(appendToDOM)
			.then(logResult)
			.catch(logError);
	};

	fetchGitRepos(repoName);
})();
