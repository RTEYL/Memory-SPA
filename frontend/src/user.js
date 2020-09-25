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
