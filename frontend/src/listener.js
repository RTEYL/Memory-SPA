document.addEventListener('click', function(e) {
	if (e.target.matches('#play')) {
		e.preventDefault();
		e.stopPropagation();
		play(e.target.innerText);
		return false;
	}
	// if (e.target.matches('')) {
	// 	e.preventDefault();
	// }
});
let addBoxListeners = (user, comp, boxes) => {
	boxes.forEach((node) => {
		if (!node.getAttribute('listening')) {
			node.addEventListener('click', (event) => {
				const eventClicked = event.target;
				eventClicked.classList.add('listening');
				user.choiceArray.push(event.currentTarget);
				highlightChoice(event.currentTarget);
				keepPlaying(user, comp, boxes);
				User.waitForClick();
			});
			node.setAttribute('listening', 'true');
		}
	});
	return boxes;
};
