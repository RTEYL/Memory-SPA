document.addEventListener('DOMContentLoaded', () => {
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
});
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
				this.extraPointCount = 3;
				break;
			case 'medium':
				this.intValCount = 1750;
				this.boxCount = 9;
				this.extraPointCount = 2;
				break;
			default:
				this.intValCount = 2500;
				this.boxCount = 6;
				this.extraPointCount = 1;
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
	highlightChoices(comp);
	addBoxListeners(user, comp, boxes);
	keepPlaying(user, comp, boxes);
};
let insertBoxes = (comp) => {
	let container = document.querySelector('.grid-container');
	for (let i = 0; i < comp.boxCount; i++) {
		let ul = document.createElement('ul');
		ul.classList.add('grid-item');
		container.appendChild(ul);
	}
};
let play = (difficulty = 'easy') => {
	let user = new User('tyler'),
		comp = new Computer(difficulty),
		buttons = document.querySelectorAll('#play');
	buttons.forEach((btn) => {
		btn.classList.add('hide');
	});
	insertBoxes(comp);
	let boxes = document.querySelectorAll('.grid-item');
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
			}, comp.intValCount + 250);
		} else if (user.choiceArray.length !== comp.choiceArray.length) {
			keepPlaying(user, comp, boxes);
		} else {
			displayResults(user, comp);
		}
	});
};
let blink = (elm, count) => {
	let flash = setInterval(() => {
		setTimeout(() => {
			elm.classList.toggle('comp-highlight');
		}, count / 6 + 50);
	}, count / 6);
	setTimeout(() => {
		clearInterval(flash);
	}, count);
};
function highlightChoices(choice) {
	console.log(choice);
	if (choice instanceof Computer) {
		let lastElm = choice.choiceArray.slice(-1)[0];
		if (lastElm.classList.contains('comp-highlight')) {
			blink(lastElm, choice.intValCount);
		} else {
			lastElm.classList.add('comp-highlight');
			setTimeout(() => {
				lastElm.classList.remove('comp-highlight');
			}, choice.intValCount);
		}
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
function displayResults(user, comp) {
	let [ modal, closeBtn, points ] = qSelect([ '.modal', '.close', '#points' ]);
	modal.style.display = 'block';
	closeBtn.addEventListener('click', function() {
		modal.style.display = 'none';
	});

	points.textContent = user.points * comp.extraPointCount;
	// failure msg
	// display score
	// use a modal?
	// update info with fetch
}
