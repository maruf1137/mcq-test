const scoreNumEl = document.querySelector('.score__number');

const score = localStorage.getItem('score');

if (score) {
	scoreNumEl.textContent = score;
}
