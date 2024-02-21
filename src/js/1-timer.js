'use strict';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const timerInput = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

let userSelectedDate;

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (selectedDates[0] <= Date.now()) {
      btnStart.disabled = true;
      iziToast.show({
        title: '❌',
        message: 'Please choose a date in the future!',
        position: 'topRight',
        messageColor: '#fff',
        messageSize: '30px',
        backgroundColor: '#f54245',
        close: false,
        closeOnClick: true,
        progressBarEasing: 'linear',
      });
    } else {
      btnStart.disabled = false;

      console.log(selectedDates[0]);
    }
  },
};

flatpickr(timerInput, options);

btnStart.addEventListener('click', () => {
  btnStart.disabled = true;
  timerInput.disabled = true;
  const timer = setInterval(() => {
    const result = userSelectedDate - Date.now();
    const timeValue = convertMs(result);
    if (result <= 0) {
      clearInterval(timer);
      timerInput.disabled = false;
    } else {
      timerDays.textContent = addLeadingZero(timeValue.days);
      timerHours.textContent = addLeadingZero(timeValue.hours);
      timerMinutes.textContent = addLeadingZero(timeValue.minutes);
      timerSeconds.textContent = addLeadingZero(timeValue.seconds);
    }
  }, 1000);
});

function addLeadingZero(value) {
  value = String(value);
  return value.length < 2 ? value.padStart(2, '0') : value;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
