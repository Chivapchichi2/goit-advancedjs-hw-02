const startBtnRef = document.querySelector('button[data-start]');
const stopBtnRef = document.querySelector('button[data-stop]');
stopBtnRef.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

let timerId;

startBtnRef.addEventListener('click', () => {
  startBtnRef.disabled = true;
  stopBtnRef.disabled = false;
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000)
})

stopBtnRef.addEventListener('click', () => {
  startBtnRef.disabled = false;
  stopBtnRef.disabled = true;
  clearInterval(timerId);
})
