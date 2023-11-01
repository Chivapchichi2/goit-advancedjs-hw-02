import { EventNames, Utils } from './misc/utils.js';

/**
 * Get reference to the start and stop buttons
 * @type {Element}
 */
const startBtnRef = document.querySelector('button[data-start]');
const stopBtnRef = document.querySelector('button[data-stop]');

/**
 * Disable the stop button
 * @type {boolean}
 */
stopBtnRef.disabled = true;

/**
 * Get random hex color
 * @returns {string}
 */
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

/**
 * Create a timerId variable
 */
let timerId;

/**
 * Add event listeners to the start  button
 */
startBtnRef.addEventListener(EventNames.CLICK, () => {
  startBtnRef.disabled = true;
  stopBtnRef.disabled = false;
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, Utils.DELAY);
});

/**
 * Add event listeners to the stop  button
 */
stopBtnRef.addEventListener(EventNames.CLICK, () => {
  startBtnRef.disabled = false;
  stopBtnRef.disabled = true;
  clearInterval(timerId);
});
