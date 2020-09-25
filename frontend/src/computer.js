class Computer {
	constructor(difficulty) {
		this.difficulty = difficulty;
		this.choiceArray = [];
	}

	set difficulty(val) {
		switch (val) {
			case 'Hard':
				this.intValCount = 800;
				this.boxCount = 12;
				break;
			case 'Medium':
				this.intValCount = 1400;
				this.boxCount = 9;
				break;
			default:
				this.intValCount = 2000;
				this.boxCount = 6;
				break;
		}
	}
	static getRandBox(boxes) {
		return boxes[Math.floor(Math.random() * boxes.length)];
	}
}
