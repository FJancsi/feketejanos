let logResult = results => {
	results.forEach(function (result) {
		console.log(`Result: ${result}`);
	});
};

let logError = error => console.log(`Something went wrong: ${error}`);

let validateResponse = response => {
	if (!response.ok) {
		throw Error(`Response error: ${response.statusText}`);
	} else {
		return response;
	}
};

let responseAsJSON = response => {
	return response.json();
};

let fetchUtils = {
	logResult: logResult,
	logError: logError,
	validateResponse: validateResponse,
	responseAsJSON: responseAsJSON
}

export default fetchUtils;
