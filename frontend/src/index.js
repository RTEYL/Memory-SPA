document.addEventListener('DOMContentLoaded', () => {
	reset();
});
let createUserHTML = (users) => {
	let ol = document.querySelector('#u-list');
	users.map((user) => {
		ol.innerHTML += `<li>${user.attributes.username} scored: ${user.attributes.highest_score}</li>`;
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
			node.classList.toggle('hide');
		});
	});
};
let insertBoxes = (comp) => {
	let container = document.querySelector('.grid-container');
	for (let i = 0; i < comp.boxCount; i++) {
		let div = document.createElement('div');
		div.classList.add('grid-item');
		container.appendChild(div);
	}
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
let highlightChoice = (choice) => {
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
};
let arraysAreEqual = (arr1, arr2) => {
	if (arr1 === arr2) return true;
	if (arr1 == null || arr2 == null) return false;
	if (arr1.length !== arr2.length) return false;
	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}
	return true;
};
let increment = (user, comp, boxes) => {
	user.choiceArray = [];
	comp.choiceArray.push(Computer.getRandBox(boxes));
	highlightChoice(comp);
	addBoxListeners(user, comp, boxes);
	return keepPlaying(user, comp, boxes);
};
let play = (difficulty) => {
	let [ username, form, instDiv ] = qSelect([ '#username', '.form', '.instructions' ]),
		buttons = document.querySelectorAll('#play');
	if (username.value) {
		let user = new User(username.value),
			comp = new Computer(difficulty);
		fetchUser(user, 'POST');
		hideNodes(buttons, [ instDiv, username, form ]);
		insertBoxes(comp);
		let boxes = document.querySelectorAll('.grid-item');
		return increment(user, comp, boxes);
	} else {
		alert('Please enter a username to continue.');
	}
};
let keepPlaying = (user, comp, boxes) => {
	let click = User.waitForClick();
	click.then(() => {
		if (arraysAreEqual(user.choiceArray, comp.choiceArray)) {
			setTimeout(() => {
				user.points += 1;
				user.choiceArray = [];
				return increment(user, comp, boxes);
			}, comp.intValCount + 250);
		} else if (user.choiceArray.length !== comp.choiceArray.length) {
			return keepPlaying(user, comp, boxes);
		} else {
			return displayResults(user);
		}
	});
};
let displayResults = (user) => {
	let [ modal, closeBtn, points, lb ] = qSelect([ '.modal', '.close', '#points', '.lb-container' ]);
	let boxes = document.querySelectorAll('.grid-item');
	hideNodes(boxes, [ lb ]);
	modal.style.display = 'block';
	points.textContent = user.points;
	closeBtn.addEventListener('click', function() {
		modal.style.display = 'none';
		fetchUser(user, 'PATCH').then(() => {
			window.location.reload();
		});
	});
};
