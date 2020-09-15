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
