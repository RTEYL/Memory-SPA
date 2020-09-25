let reset = () => {
	fetch('http://localhost:3000/leaderboards')
		.then((resp) => {
			return resp.json();
		})
		.then((json) => {
			let users = json.included.sort((a, b) => b.attributes.highest_score - a.attributes.highest_score);
			return createUserHTML(users);
		})
		.catch((err) => {
			alert(err);
		});
};
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
	return fetch(url, configFetch)
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
