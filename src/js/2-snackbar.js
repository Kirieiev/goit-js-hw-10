'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formField = document.querySelector('.form');

formField.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const { state, delay } = formField.elements;
  const selectedState = Array.from(state).find(radio => radio.checked);
  getPromise(delay.value, selectedState.value)
    .then(delay => {
      iziToast.success({
        title: 'Success',
        position: 'topRight',
        messageColor: '#fff',
        messageSize: '30px',
        backgroundColor: '#19e619',
        close: false,
        closeOnClick: true,
        progressBarEasing: 'linear',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
      console.log(`✅ Fulfilled promise in ${delay}ms`);
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        position: 'topRight',
        messageColor: '#fff',
        messageSize: '30px',
        backgroundColor: '#f54245',
        close: false,
        closeOnClick: true,
        progressBarEasing: 'linear',
        message: `❌ Rejected promise in ${delay}ms`,
      });
      console.log(`❌ Rejected promise in ${delay}ms`);
    });
}

function getPromise(delay, selectedState) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedState === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
