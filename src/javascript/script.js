const timerEl = document.getElementById('timer');
const marksList = document.getElementById('marks-list');
let intervalId = 0;
let timer = 0;
let marks = [];

const formatTime = (time) => {
  const horas = Math.floor(time / 360000);
  const minutos = Math.floor((time % 360000) / 6000);
  const segundos = Math.floor((time % 6000) / 100);
  const milesimos = time % 100;

  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}:${milesimos.toString().padStart(2, '0')}`;
}

const setTimer = (time) => {
  timerEl.innerText = formatTime(time);
}

const addMarkToList = (markIndex, markTime) => {
  marksList.innerHTML += `<p>Marca ${markIndex}: ${formatTime(markTime)}</p>`;
}

const toggleTimer = () => {
  const button = document.getElementById('power');
  const action = button.getAttribute('action');

  clearInterval(intervalId);

  if (action == 'start' || action == 'continue'){
    intervalId = setInterval(() => {
      timer += 1;
      setTimer(timer);
    }, 10);
    button.setAttribute('action', 'pause');
    button.innerHTML = '<i class="fa-solid fa-pause"></i>';
  } else if (action == 'pause'){
    button.setAttribute('action', 'continue');
    button.innerHTML = '<i class="fa-solid fa-play"></i>';
  }
}

const markTime = () => {
  marks.push(timer);
  addMarkToList(marks.length, timer);
}

const resetTimer = () => {
  clearInterval(intervalId);
  timer = 0;
  marks = [];
  setTimer(timer);
  marksList.innerHTML = '';
  const button = document.getElementById('power');
  button.setAttribute('action', 'start');
  button.innerHTML = '<i class="fa-solid fa-play"></i>';
}

document.getElementById('power').addEventListener('click', toggleTimer);
document.getElementById('mark').addEventListener('click', markTime);
document.getElementById('reset').addEventListener('click', resetTimer);