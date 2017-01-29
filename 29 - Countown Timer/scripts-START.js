let timer;
const btns = document.querySelectorAll('button');
const timeLeft = document.querySelector('.display__time-left');
const dateTarget = document.querySelector('.display__end-time');
const form = document.querySelector('#custom');
const formInput = form.querySelector('input');

const getFormMinutes = () => formInput.value * 60;

function formatTime(value) {
    let hours = Math.floor(value / 3600);
    let minutes = Math.floor((value - (hours * 3600)) / 60);
    let seconds = value - (hours * 3600) - (minutes * 60);

	if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;

    return `${hours}:${minutes}:${seconds}`;
}

function renderTime(seconds) {
	const time = formatTime(seconds);
	document.title = time;
	timeLeft.textContent = time;
}

function renderDate(timestamp) {
	const end = new Date(timestamp);
	const [hour, minutes] = [end.getHours(), end.getMinutes()];

	dateTarget.textContent = `Be back at ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function handleTimer(event) {
	event.preventDefault();
	clearInterval(timer);
	const seconds = this.dataset.time || getFormMinutes();
	const now = Date.now();
	const then = now + seconds * 1000;

	renderTime(seconds);
	renderDate(then);

	timer = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		if (secondsLeft < 0) {
		  clearInterval(timer);
	      return;
	  	}

		renderTime(secondsLeft);
	}, 1000);
}

form.addEventListener('submit', handleTimer);
btns.forEach(btn => btn.addEventListener('click', handleTimer));
