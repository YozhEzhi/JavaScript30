/**
 * Variables.
 */
const player = document.querySelector('.player');
const playBtn = player.querySelector('.player__button.toggle');
const playerSliders = player.querySelectorAll('.player__slider');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const skipBtns = player.querySelectorAll('.player__button:not(.toggle)');
const video = player.querySelector('.player__video');

let mousedown = false;

/**
 * Functions.
 */
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  playBtn.textContent = this.paused ? '►' : '❚❚';
}

function updateDurationBar() {
  progressBar.style.width = `${(video.currentTime * 100 / video.duration)}%`;
}

function handleSliderChange() {
  video[this.name] = this.value;
}

function skipTime() {
  let deltaTime = parseInt(this.getAttribute('data-skip'), 10);
  video.currentTime = video.currentTime + deltaTime;
}

function scrub(event) {
  video.currentTime = (event.offsetX * video.duration) / progress.offsetWidth;
}

/**
 * Setup event listeners.
 */
playBtn.addEventListener('click', togglePlay);
playerSliders.forEach(item => item.addEventListener('change', handleSliderChange));
playerSliders.forEach(item => item.addEventListener('mousemove', handleSliderChange));
skipBtns.forEach(item => item.addEventListener('click', skipTime));

video.addEventListener('click', togglePlay);
video.addEventListener('pause', updateButton);
video.addEventListener('play', updateButton);
video.addEventListener('timeupdate', updateDurationBar);

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', event => mousedown && scrub(event));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
