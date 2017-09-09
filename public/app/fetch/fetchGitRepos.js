import fetchUtils from './fetchUtils.js';

'use stric';

let repos = [];

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

let fetchGitRepos = repoName => {
	fetch(`https://api.github.com/users/${repoName}/repos?type=owner`)
		.then(fetchUtils.validateResponse)
		.then(fetchUtils.responseAsJSON)
		.then(mapResponse)
		.then(appendToDOM)
		.then(fetchUtils.logResult)
		.catch(fetchUtils.logError);
};

export default fetchGitRepos;
