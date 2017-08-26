(function () {
	'use strict';
	const repoName = 'FJancsi';
	let repos = [];

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

	const fetchRepos = repoName => {
		fetch(`https://api.github.com/users/${repoName}/repos?type=owner`)
			.then(validateResponse)
			.then(responseAsJSON)
			.then(mapResponse)
			.then(logResult)
			.catch(logError);
	};

	fetchRepos(repoName);
})();
