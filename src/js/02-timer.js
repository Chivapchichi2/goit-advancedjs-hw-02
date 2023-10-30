import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';
import 'flatpickr/dist/flatpickr.min.css';

const selector = 'input[type="text"]';
const startBtnRef = document.querySelector('button[data-start]');
startBtnRef.disabled = true;

let timer = null;

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
      const arrayOfTimes = [days, hours, minutes, seconds];
      arrayOfSpans.forEach((span, i) => (span.textContent = arrayOfTimes[i]));
    }, 1000);
  }
}

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

flatpickr(selector, options);
startBtnRef.addEventListener('click', () => {
  if (timer) {
    timer.startTimer();
    startBtnRef.disabled = true;
  }
});
