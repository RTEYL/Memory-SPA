document.addEventListener('click', function(e) {
	if (e.target.matches('#play')) {
		e.preventDefault();
		return play(e.target.innerText);
	}
	if (e.target.matches('.grid-item')) {
		e.preventDefault();
		return e.target.classList.add('listening');
	}
});
