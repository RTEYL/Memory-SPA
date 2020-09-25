document.addEventListener('click', function(e) {
	if (e.target.matches('.play')) {
		e.preventDefault();
		play(e.target.innerText);
	}
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
			});
			node.setAttribute('listening', 'true');
		}
	});
	return boxes;
};
