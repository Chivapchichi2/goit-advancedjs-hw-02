import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';
import 'flatpickr/dist/flatpickr.min.css';
import { EventNames, Utils } from './misc/utils.js';

/**
 * Constant for input selector
 * @type {string}
 */
const selector = 'input[type="text"]';

/**
 * Get the start button
 * @type {Element}
 */
const startBtnRef = document.querySelector('button[data-start]');
startBtnRef.disabled = true;

/**
 * Timer
 * @type {null}
 */
let timer = null;

/**
 * Class for timer
 */
class CountdownTimer {
  constructor(selector, targetDate) {
    this.selector = selector;
    this.targetDate = targetDate;
  }

  startTimer() {
    const timeTarget = this.targetDate.getTime();
    const timerRef = document.querySelector(this.selector);
    const arrayOfSpans = timerRef.querySelectorAll('.value');
    const intervalId = setInterval(function makeTimer() {
      const time = timeTarget - Date.now();
      if (time <= 0) {
        clearInterval(intervalId);
        return;
      }
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const days = Math.floor(time / day);
      const hours = Math.floor((time % day) / hour);
      const minutes = Math.floor(((time % day) % hour) / minute);
      const seconds = Math.floor((((time % day) % hour) % minute) / second);
      const arrayOfTimes = [days, hours, minutes, seconds].map(time =>
        time.toString().padStart(2, '0')
      );
      arrayOfSpans.forEach((span, i) => (span.textContent = arrayOfTimes[i]));
    }, Utils.DELAY);
  }
}

/**
 * Options for flatpickr
 * @type {{defaultDate: Date, onClose(*): void, enableTime: boolean, time_24hr: boolean, minuteIncrement: number}}
 */
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < new Date().getTime()) {
      iziToast.error({
        title: 'Error',
        titleColor: 'red',
        message: 'Please choose a date in the future',
        messageColor: 'red',
        position: 'topRight',
        close: false,
        closeOnClick: true,
        progressBarColor: 'red',
        icon: null,
        timeout: 1500,
      });
    } else {
      timer = new CountdownTimer('.timer', selectedDates[0]);
      startBtnRef.disabled = false;
    }
  },
};

/**
 * Create flatpickr
 */
new flatpickr(selector, options);

/**
 * Event listener for start button
 */
startBtnRef.addEventListener(EventNames.CLICK, () => {
  if (timer) {
    timer.startTimer();
    startBtnRef.disabled = true;
  }
});
