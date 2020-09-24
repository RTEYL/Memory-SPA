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
				this.extraPointCount = 3;
				break;
			case 'Medium':
				this.intValCount = 1400;
				this.boxCount = 9;
				this.extraPointCount = 2;
				break;
			default:
				this.intValCount = 2000;
				this.boxCount = 6;
				this.extraPointCount = 1;
				break;
		}
	}
	static getRandBox(boxes) {
		return boxes[Math.floor(Math.random() * boxes.length)];
	}
}
