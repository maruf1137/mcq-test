// mcq data
const mcq_data = [
	{
		id: 1,
		title: "What is the past form of 'eat'?",
		options: ['eat', 'ate', 'eaten', 'have ate'],
		answer: 'ate',
	},
	{
		id: 2,
		title: 'Which sentence is present continuous tense?',
		options: [
			'I eat rice',
			'I am eating rice',
			'I have eaten rice',
			'I have been eating rice for 1 year',
		],
		answer: 'I am eating rice',
	},
	{
		id: 3,
		title: 'Which sentence is present perfect tense?',
		options: [
			'I eat rice',
			'I am eating rice',
			'I have eaten rice',
			'I have been eating rice for 1 year',
		],
		answer: 'I have eaten rice',
	},
	{
		id: 4,
		title: 'Which sentence is present perfect continuous tense?',
		options: [
			'I eat rice',
			'I am eating rice',
			'I have eaten rice',
			'I have been eating rice for 1 year',
		],
		answer: 'I have been eating rice for 1 year',
	},
	{
		id: 5,
		title: 'Which sentence is past continuous tense?',
		options: [
			'I eat rice',
			'I was eating rice',
			'I have eaten rice',
			'I have been eating rice for 1 year',
		],
		answer: 'I was eating rice',
	},
	{
		id: 6,
		title: 'Which sentence is past perfect tense?',
		options: [
			'I eat rice',
			'I was eating rice',
			'I have eaten rice',
			'I have been eating rice for 1 year',
		],
		answer: 'I have eaten rice',
	},
	{
		id: 7,
		title: 'Which sentence is past perfect continuous tense?',
		options: [
			'I eat rice',
			'I was eating rice',
			'I have eaten rice',
			'I have been eating rice for 1 year',
		],
		answer: 'I have been eating rice for 1 year',
	},
	{
		id: 8,
		title: 'Which sentence is future continuous tense?',
		options: [
			'I eat rice',
			'I will be eating rice',
			'I have eaten rice',
			'I have been eating rice for 1 year',
		],
		answer: 'I will be eating rice',
	},
	{
		id: 9,
		title: 'Which sentence is future perfect tense?',
		options: [
			'I eat rice',
			'I will be eating rice',
			'I will have eaten rice',
			'I have been eating rice for 1 year',
		],
		answer: 'I will have eaten rice',
	},
	{
		id: 10,
		title: 'Which sentence is future perfect continuous tense?',
		options: [
			'I eat rice',
			'I will be eating rice',
			'I will have eaten rice',
			'I will have been eating rice for 1 year',
		],
		answer: 'I will have been eating rice for 1 year',
	},
];

// mcq markup
const answers = [];
const mcqWrapper = document.querySelector('.mcq__wrapper');
const markup = `
   ${mcq_data
			.map((item, index) => {
				const { id, title, options } = item;

				return `
               <div class="mcq__box box">
						<h3 class="heading mb-1">${id}. ${title}</h3>
						<ul class="mcq__list mcq__list--${id}">
                     ${options
												.map((item, i) => {
													const numberId = '' + i + id;
													return `
                              <li class="mcq__item">
								         <input type="radio" name=${id} id=${numberId} />
								         <label for=${numberId} data-index="${index}" data-value="${item}">${item}</label>
							         </li>
                           `;
												})
												.join(' ')}
						</ul>
					</div>
      `;
			})
			.join(' ')}  
   `;
mcqWrapper.innerHTML = '';
mcqWrapper.insertAdjacentHTML('afterbegin', markup);

// q&a functionalities
const btnFinish = document.querySelector('.btn-finish');
mcqWrapper.addEventListener('click', (e) => {
	const el = e.target;
	if (e.target.closest('li.mcq__item > label')) {
		const { index, value } = el.dataset;
		const answer = {
			parent: index,
			corretAnswer: mcq_data[index].answer,
			value,
		};
		answers.push(answer);
		const parentEl = el.parentElement.parentElement;
		parentEl.classList.add('disabled');
	}
});

// local storage
localStorage.removeItem('score');
btnFinish.addEventListener('click', () => {
	if (answers.length <= 0) return;
	let score = 0;
	for (let i = 0; i < answers.length; i++) {
		if (answers[i].corretAnswer === answers[i].value) {
			score++;
		}
	}
	localStorage.setItem('score', JSON.stringify(score));

	location.pathname = 'result.html';
});

// coundown timer
const startingmunutes = 10;
let time = startingmunutes * 60;

const cowndownTimeEl = document.querySelector('.countdown-timer');

const updateCountDown = () => {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;

	cowndownTimeEl.innerHTML = '';
	cowndownTimeEl.insertAdjacentHTML('afterbegin', `00: ${minutes} : ${seconds}`);
	time--;

	if (time <= 0) {
		location.pathname = 'timeout.html';
	}
};
setInterval(updateCountDown, 1000);
