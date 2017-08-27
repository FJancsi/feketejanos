(function () {
	'use strict';

	let repos = [];
	const repoName = 'FJancsi';
	const logResult = results => {
		results.forEach(function(result) {
			console.log(`RepoName: ${result.repoName}`);
		});
	};
	const logError = error => console.log(`Something went wrong: ${error}`);
	const validateResponse = response => {
		if (!response.ok) {
			throw Error(`Response error: ${response.statusText}`);
		} else {
			return response;
		}
	};
	const responseAsJSON = response => {
		return response.json();
	};
	const mapResponse = response => {
		repos = response.map(item => {
			return {
				repoName: item.name,
				repoURL: item.html_url,
				repoDesc: item.description,
				repoLastUpdate: item.updated_at
			};
		});

		return repos;
	};
	const appendToDOM = elements => {
		let $container = document.querySelector('.section-container, .git-repos');

		elements.forEach(element => {
			createDOMAndAppendToParent($container, element);
		});

		return elements;
	};
	const createDOMAndAppendToParent = (parent, element) => {
		let $element = document.createElement('div');
		for (let prop in element) {
			let $elementContentContainer = document.createElement('p');
			let $elementContent = document.createTextNode(`${element[prop]}`);

			$elementContentContainer.appendChild($elementContent);
			$element.appendChild($elementContentContainer);
		}
		parent.appendChild($element);
	};

	const fetchRepos = repoName => {
		fetch(`https://api.github.com/users/${repoName}/repos?type=owner`)
			.then(validateResponse)
			.then(responseAsJSON)
			.then(mapResponse)
			.then(appendToDOM)
			.then(logResult)
			.catch(logError);
	};

	fetchRepos(repoName);
})();
