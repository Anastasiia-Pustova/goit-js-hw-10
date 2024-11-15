import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorMessage from '../img/error-message.svg';

const datetimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');

let currentData = new Date();
let userSelectedDate = null;

// Блокування кнопки після натискання
startBtn.disabled = true;

startBtn.addEventListener('click', onStartTimerClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      iziToast.show({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: '#ef4040',
        titleColor: '#fff',
        titleSize: '16px',
        titleLineHeight: '24px',
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '24px',
        iconUrl: errorMessage,
        timeout: 5000,
      });
      startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      startBtn.disabled = false;
    }
  },
};

// Ініціалізація flatpickr
flatpickr(datetimePicker, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer({ days, hours, minutes, seconds }) {
  dataDays.textContent = days;
  dataHours.textContent = hours;
  dataMinutes.textContent = minutes;
  dataSeconds.textContent = seconds;
}

function onStartTimerClick() {
  // Блокування кнопки та input
  startBtn.disabled = true;
  datetimePicker.disabled = true;

  const intervalId = setInterval(() => {
    currentData = new Date();
    const differentTime = userSelectedDate - currentData;

    // Якщо залишок часу <= 0, зупинити таймер і обнулити значення
    if (differentTime <= 0) {
      clearInterval(intervalId);
      updateTimer({ days: '00', hours: '00', minutes: '00', seconds: '00' });

      // Розблокувати кнопку і input
      datetimePicker.disabled = false;
      return;
    }

    const time = convertMs(differentTime);
    updateTimer(time);
  }, 1000);
}
