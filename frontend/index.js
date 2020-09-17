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
function play(correctChoiceArray = [], userChoiceArray) {
	console.log('play');
	let button = document.querySelector('#play');
	let boxes = document.querySelectorAll('.box.grid-item');
	let randomChoice;
	userChoiceArray = [];
	button.classList.add('hide');
	randomChoice = boxes[Math.floor(Math.random() * boxes.length)];
	correctChoiceArray.push(randomChoice);
	highlightChoices([ ...correctChoiceArray ]);
	boxes.forEach(function(node) {
		node.addEventListener('click', (event) => {
			const eventClicked = event.target;
			eventClicked.classList.add('listening');
			userChoiceArray.push(event.currentTarget);
			highlightChoices(userChoiceArray);
			keepPlaying([ ...userChoiceArray ], [ ...correctChoiceArray ]);
		});
	});
}
function highlightChoices(choice) {
	let light = 'highlight';
	if (Array.isArray(choice)) {
		choice.forEach((elm) => {
			console.log('highlighted', choice);
			elm.classList.add(light);
			setTimeout(() => {
				elm.classList.remove(light);
			}, 2000);
		});
	} else {
		setTimeout(() => {
			choice.classList.add(light);
			setTimeout(() => {
				choice.classList.remove(light);
			}, 4000);
		}, 2000);
	}
}
function waitForUserClick() {
	console.log('wait');
	return new Promise((resolve) => {
		let click = document.querySelector('.listening');
		if (click) {
			click.classList.remove('listening');
			resolve();
		}
	});
}
function arraysAreEqual(arr1, arr2) {
	console.log('user:', arr1, 'comp:', arr2);
	if (arr1 === arr2) return true;
	if (arr1 == null || arr2 == null) return false;
	if (arr1.length !== arr2.length) return false;
	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}
	return true;
}
function keepPlaying(userChoiceArray, correctChoiceArray) {
	console.log('keep playing');
	let click = waitForUserClick();
	click.then(() => {
		if (arraysAreEqual(userChoiceArray, correctChoiceArray)) {
			console.log('incrementing');
			userChoiceArray = [];
			setTimeout(() => {
				play(correctChoiceArray, userChoiceArray);
			}, 2000);
		} else if (userChoiceArray.length !== correctChoiceArray.length) {
			console.log('wait again');
			waitForUserClick();
		} else {
			displayResults(correctChoiceArray, userChoiceArray);
		}
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
	modal.innerHTML = `<h3>You scored <em>${userChoiceArray.length - 1}</em>pts.</h3>`;
	// failure msg
	// display score
	// use a modal?
	// update info with fetch
}
