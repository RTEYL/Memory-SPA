fetch('http://localhost:3000/leaderboards')
	.then((response) => {
		return response.json();
	})
	.then((json) => {
		createLeaderboardHTML(json.included);
	})
	.catch((err) => {
		alert(err);
	});

let createLeaderboardHTML = (userData) => {
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
function play(correctChoiceArray = []) {
	console.log('play');
	let button = document.querySelector('#play');
	button.classList.add('hide');
	let boxes = document.querySelectorAll('.box.grid-item');
	let randomChoice;
	let userChoiceArray = [];

	console.log('c arr', userChoiceArray);
	randomChoice = boxes[Math.floor(Math.random() * boxes.length)];
	correctChoiceArray.push(randomChoice);
	console.log('random choice', randomChoice);
	highlightChoices(correctChoiceArray);
	console.log('u ', userChoiceArray.length);
	console.log('c ', correctChoiceArray.length);
	boxes.forEach(function(node) {
		node.addEventListener('click', (event) => {
			const eventClicked = event.target;
			eventClicked.classList.add('listening');
			userChoiceArray.push(event.currentTarget);
			console.log(event.currentTarget);
			highlightChoices([ event.currentTarget ]);
			keepPlaying(userChoiceArray, correctChoiceArray, boxes);
		});
	});
}

function displayResults(correctChoiceArray, userChoiceArray) {
	console.log('display');
	let modal = document.querySelector('.modal');
	let content = document.querySelector('.modal-content');
	let closeBtn = document.querySelector('.close');
	modal.style.display = 'block';
	closeBtn.addEventListener('click', function() {
		modal.style.display = 'none';
	});
	modal.innerHTML = `<h3>You scored <em>${userChoiceArray.length}</em>pts.</h3>`;
	// failure msg
	// display score
	// use a modal?
	// update info with fetch
}
function highlightChoices(choices) {
	console.log('highlight');
	choices.forEach((choice) => {
		console.log('highlighted', choice);
		choice.classList.add('highlight');
		setTimeout(() => {
			choice.classList.remove('highlight');
		}, 3000);
	});
}
function arraysAreEqual(arr1, arr2) {
	console.log('user:', arr1, 'comp:', arr2);
	return JSON.stringify(arr1) == JSON.stringify(arr2) ? true : false;
}
