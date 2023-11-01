import throttle from 'lodash.throttle';
import { EventNames, Utils } from './misc/utils.js';
import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

/**
 * Get reference to the form
 * @type {Element}
 */
const form = document.querySelector('.form');

/**
 * init formData
 */
let formData = {};

/**
 * baseIziToastConfig
 */
const baseIziToastConfig = {
  timeout: 2000,
  close: false,
  closeOnClick: true,
  icon: null,
};

/**
 * reset formData
 */
function resetFormData() {
  formData = { amount: null, delay: null, step: null };
}

resetFormData();

/**
 * Create promise
 * @param position
 * @param delay
 * @returns {Promise<unknown>}
 */
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

/**
 * Create promises
 * @param amount
 * @param delay
 * @param step
 */
function createPromises({ amount, delay, step }) {
  let counter = 0;
  while (counter < amount) {
    createPromise(counter + 1, delay + counter * step)
      .then(({ position, delay }) => {
        iziToast.success({
          title: 'OK',
          titleColor: 'green',
          message: `✅ Fulfilled promise ${position} in ${delay}ms`,
          messageColor: 'green',
          position: 'topRight',
          progressBarColor: 'green',
          ...baseIziToastConfig,
        });
      })
      .catch(({ position, delay }) => {
        iziToast.error({
          title: 'Error',
          titleColor: 'red',
          message: `❌ Rejected promise ${position} in ${delay}ms`,
          messageColor: 'red',
          position: 'topRight',
          progressBarColor: 'red',
          ...baseIziToastConfig,
        });
      });
    counter += 1;
  }
}

/**
 * Add event listeners
 */
form.addEventListener(
  EventNames.INPUT,
  throttle(evt => {
    formData[evt.target.name] = Number(evt.target.value);
  }, Utils.THROTTLE_DELAY)
);

/**
 * Add event listeners
 */
form.addEventListener(EventNames.SUBMIT, evt => {
  evt.preventDefault();
  if (formData.amount <= 0 || formData.delay <= 0 || formData.step <= 0) {
    return iziToast.error({
      title: 'Error',
      titleColor: 'red',
      message: 'Please check the values, value must be greater than 0',
      messageColor: 'red',
      position: 'topRight',
      progressBarColor: 'red',
      ...baseIziToastConfig,
    });
  } else {
    createPromises(formData);
    resetFormData();
    form.reset();
  }
});
