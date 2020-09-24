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
		return new Promise(() => {
			let click = document.querySelector('.listening');
			if (click) {
				click.classList.remove('listening');
				return click;
			}
		});
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
		})
		.catch((err) => {
			alert(err);
		});
};
