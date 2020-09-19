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

let createLeaderboardHTML = (user) => {
	let container = document.querySelector('.lb-container');
	container.innerHTML += `<h3>Leaderboard</h3><ul class='lb'></ul>`;
	createUserHTML(user);
};
let createUserHTML = (users) => {
	let ul = document.querySelector('ul.lb');
	users.map((user, i) => {
		ul.innerHTML += `<li>${i + 1}: ${user.attributes.username} scored: ${user.attributes.score}</li>`;
	});
};
class User {
	constructor(username) {
		this.username = username;
		this.choiceArray = [];
	}
	get points() {
		return this.choiceArray.length - 1;
	}
	static waitForClick() {
		return new Promise((resolve) => {
			let click = document.querySelector('.listening');
			if (click) {
				click.classList.remove('listening');
				resolve();
			}
		});
	}
}
class Computer {
	constructor(difficulty) {
		this.difficulty = difficulty;
		this.choiceArray = [];
	}

	set difficulty(val) {
		switch (val) {
			case 'hard':
				this.intValCount = 1000;
				this.boxCount = 12;
				this.highlightOne = true;
				this.extraPointCount = 2;
				break;
			case 'medium':
				this.intValCount = 1750;
				this.boxCount = 9;
				this.highlightOne = true;
				this.extraPointCount = 1;
				break;

			default:
				this.intValCount = 2500;
				this.boxCount = 6;
				this.highlightOne = false;
				this.extraPointCount = 0;
				break;
		}
	}
	static getRandBox(boxes) {
		return boxes[Math.floor(Math.random() * boxes.length)];
	}
}
let qSelect = (array) => {
	return array.map((str) => {
		return document.querySelector(str);
	});
};

let increment = (user, comp, boxes) => {
	user.choiceArray = [];
	comp.choiceArray.push(Computer.getRandBox(boxes));
	comp.highlightOne ? highlightChoices(comp.choiceArray[-1]) : highlightChoices(comp.choiceArray);

	addBoxListeners(user, comp, boxes);
	keepPlaying(user, comp, boxes);
};
let insertBoxes = (comp) => {
	console.log(comp);
	let container = document.querySelector('.grid-container'),
		ul = document.createElement('ul');
	ul.classList.add('new-item');
	for (let i = 0; i < comp.boxCount; i++) {
		container.appendChild(ul);
	}
};
let play = (difficulty = 'easy') => {
	let user = new User('tyler'),
		comp = new Computer(difficulty),
		buttons = document.querySelectorAll('#play'),
		boxes = document.querySelectorAll('.grid-item');
	buttons.forEach((btn) => {
		btn.classList.add('hide');
	});
	insertBoxes(comp);
	increment(user, comp, boxes);
};
let addBoxListeners = (user, comp, boxes) => {
	boxes.forEach((node) => {
		if (!node.getAttribute('listening')) {
			node.addEventListener('click', (event) => {
				const eventClicked = event.target;
				eventClicked.classList.add('listening');
				user.choiceArray.push(event.currentTarget);
				highlightChoices(event.currentTarget);
				keepPlaying(user, comp, boxes);
			});
			node.setAttribute('listening', 'true');
		}
	});
	return boxes;
};

let keepPlaying = (user, comp, boxes) => {
	let click = User.waitForClick();
	click.then(() => {
		if (arraysAreEqual(user.choiceArray, comp.choiceArray)) {
			setTimeout(() => {
				user.choiceArray = [];
				increment(user, comp, boxes);
			}, 2000);
		} else if (user.choiceArray.length !== comp.choiceArray.length) {
			keepPlaying(user, comp, boxes);
		} else {
			displayResults(user);
		}
	});
};
let blink = (elm) => {
	let flash = setInterval(() => {
		setTimeout(() => {
			elm.classList.toggle('comp-highlight');
		}, 300);
	}, 250);
	setTimeout(() => {
		clearInterval(flash);
	}, 1500);
};
function highlightChoices(choice) {
	if (Array.isArray(choice)) {
		choice.forEach((elm) => {
			if (elm.classList.contains('comp-highlight')) {
				blink(elm);
			} else {
				elm.classList.add('comp-highlight');
				setTimeout(() => {
					elm.classList.remove('comp-highlight');
				}, 1500);
			}
		});
	} else {
		choice.classList.add('highlight');
		setTimeout(() => {
			choice.classList.remove('highlight');
		}, 1500);
	}
}
function arraysAreEqual(arr1, arr2) {
	if (arr1 === arr2) return true;
	if (arr1 == null || arr2 == null) return false;
	if (arr1.length !== arr2.length) return false;
	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}
	return true;
}
function displayResults(user) {
	let [ modal, closeBtn, points ] = qSelect([ '.modal', '.close', '#points' ]);
	modal.style.display = 'block';
	closeBtn.addEventListener('click', function() {
		modal.style.display = 'none';
	});
	points.textContent = user.points;
	// failure msg
	// display score
	// use a modal?
	// update info with fetch
}
