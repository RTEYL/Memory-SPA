document.addEventListener('DOMContentLoaded', () => {
	fetch('http://localhost:3000/leaderboards')
		.then((response) => {
			return response.json();
		})
		.then((json) => {
			createLeaderboard(json.included);
		})
		.catch((err) => {
			console.log(err);
		});
});
let createLeaderboard = (userData) => {
	let container = document.querySelector('.lb-container');
	container.innerHTML += `<h3>Leaderboard</h3><ul class='lb'></ul>`;
	createUserHTML(userData);
};
let createUserHTML = (users) => {
	let ul = document.querySelector('ul.lb');
	users.map((user, i) => {
		ul.innerHTML += `<li>${i + 1}: ${user.attributes.username} scored: ${user.attributes.score}</li>`;
	});
};
let displayResults = (correctChoiceArray, userChoiceArray, numCorrect) => {
	// failure msg
	// display score
	// use a modal?
	// update info with fetch
};
let highlightChoices = (choices) => {
	choices.forEach((choice) => {
		choice.classList.add('highlight');
		setTimeout(() => {
			choice.classList.remove('highlight');
		}, 3000);
	});
};
