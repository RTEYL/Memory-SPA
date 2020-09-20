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
	document.querySelector('#user-form').addEventListener('submit', (event) => {
		event.preventDefault();
		play(event.submitter.innerText);
	});
});
class User {
	constructor(username) {
		this.username = username;
		this.choiceArray = [];
		this.points = 0;
		this._id;
	}
	get id() {
		return this._id;
	}
	set id(val) {
		this._id = val;
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
			case 'Hard':
				this.intValCount = 1000;
				this.boxCount = 12;
				this.extraPointCount = 3;
				break;
			case 'Medium':
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
let fetchUser = (user, method) => {
	let url = '';
	if (user.id) {
		url = `http://localhost:3000/users/${user.id}`;
	} else {
		url = 'http://localhost:3000/users';
	}
	let configFetch = {
		method: method,
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			username: user.username,
			score: user.points,
			leaderboard_id: 1,
			id: user.id
		})
	};
	fetch(url, configFetch)
		.then((resp) => {
			return resp.json();
		})
		.then((json) => {
			user.id = json.data.attributes.id;
			return user;
		})
		.catch((err) => {
			alert(err);
		});
};
let createLeaderboardHTML = (user) => {
	let container = document.querySelector('.lb-container');
	container.innerHTML += `<h3>Leaderboard</h3><ul class='lb'></ul>`;
	createUserHTML(user);
};
let createUserHTML = (users) => {
	let ul = document.querySelector('ul.lb');
	users.map((user, i) => {
		ul.innerHTML += `<li>${i + 1}: ${user.attributes.username} scored: ${user.attributes.highest_score}</li>`;
	});
};
let qSelect = (array) => {
	return array.map((str) => {
		return document.querySelector(str);
	});
};
let hideNodes = (...args) => {
	args.forEach((arr) => {
		arr.forEach((node) => {
			node.classList.add('hide');
		});
	});
};
let insertBoxes = (comp) => {
	let container = document.querySelector('.grid-container');
	for (let i = 0; i < comp.boxCount; i++) {
		let ul = document.createElement('ul');
		ul.classList.add('grid-item');
		container.appendChild(ul);
	}
};
let addBoxListeners = (user, comp, boxes) => {
	boxes.forEach((node) => {
		if (!node.getAttribute('listening')) {
			node.addEventListener('click', (event) => {
				const eventClicked = event.target;
				eventClicked.classList.add('listening');
				user.choiceArray.push(event.currentTarget);
				highlightChoice(event.currentTarget);
				keepPlaying(user, comp, boxes);
			});
			node.setAttribute('listening', 'true');
		}
	});
	return boxes;
};
let increment = (user, comp, boxes) => {
	user.choiceArray = [];
	comp.choiceArray.push(Computer.getRandBox(boxes));
	highlightChoice(comp);
	addBoxListeners(user, comp, boxes);
	keepPlaying(user, comp, boxes);
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
function highlightChoice(choice) {
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
		}, 1250);
	}
}
let arraysAreEqual = (arr1, arr2) => {
	if (arr1 === arr2) return true;
	if (arr1 == null || arr2 == null) return false;
	if (arr1.length !== arr2.length) return false;
	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}
	return true;
};
let play = (difficulty) => {
	let [ username, label ] = qSelect([ '#username', '.username-label' ]);
	if (username.value) {
		let user = new User(username.value),
			comp = new Computer(difficulty),
			buttons = document.querySelectorAll('#play'),
			instDiv = document.querySelector('.instructions');
		fetchUser(user, 'POST');
		hideNodes(buttons, [ instDiv, username, label ]);
		insertBoxes(comp);
		let boxes = document.querySelectorAll('.grid-item');
		increment(user, comp, boxes);
	} else {
		alert('Please enter a username to continue.');
	}
};
let keepPlaying = (user, comp, boxes) => {
	let click = User.waitForClick();
	click.then(() => {
		if (arraysAreEqual(user.choiceArray, comp.choiceArray)) {
			setTimeout(() => {
				user.points += comp.extraPointCount;
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
let displayResults = (user, comp) => {
	let [ modal, closeBtn, points ] = qSelect([ '.modal', '.close', '#points' ]);
	modal.style.display = 'block';
	points.textContent = user.points;
	closeBtn.addEventListener('click', function() {
		modal.style.display = 'none';
		fetchUser(user, 'PATCH');
	});
};
