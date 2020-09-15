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
let arraysAreEqual = (arr1, arr2) => {
	return JSON.stringify(arr1) == JSON.stringify(arr2) ? true : false;
};
let keepPlaying = (userChoiceArray, correctChoiceArray) => {
	if (userChoiceArray == '' || JSON.stringify(userChoiceArray) == JSON.stringify(correctChoiceArray)) {
		play(correctChoiceArray);
	} else {
		return false;
	}
};

function play(correctChoiceArray = [], userChoiceArray = [], callback) {
	console.log('play');
	let numCorrect = -1;
	let boxes = document.querySelectorAll('.box.grid-item');
	let randomChoice;
	numCorrect += 1;
	randomChoice = boxes[Math.floor(Math.random() * boxes.length)];
	correctChoiceArray.push(randomChoice);
	highlightChoices(correctChoiceArray);
	waitForUserClick();
	function waitForUserClick() {
		boxes.forEach(function(node) {
			if (node.getAttribute('listener') !== 'true') {
				node.addEventListener('click', (event) => {
					const eventClicked = event.target;
					eventClicked.setAttribute('listener', 'true');
					userChoiceArray.push([ event.currentTarget ]);
					highlightChoices([ event.currentTarget ]);
					keepPlaying(userChoiceArray, correctChoiceArray);
				});
			} else {
				waitForUserClick();
			}
		});
	}
	console.log('user', userChoiceArray);
	console.log('correct', correctChoiceArray);
	// reset()
	console.log('done');
	displayResults(correctChoiceArray, userChoiceArray, numCorrect);
}
