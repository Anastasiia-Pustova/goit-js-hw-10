import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorMessage from '../img/error-message.svg';

const datetimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
// const errorMessage = document.querySelector('.error-message');

const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataiMnutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');

let curentData = new Date();
let userSelectedDate = null;

startBtn.addEventListener('click', onStartTimerClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < curentData) {
      iziToast.show({
        title: 'Error',
        message: 'Please choose a data in the future',
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
      // errorMessage.classList.add('active');
      startBtn.disabled = true;
    } else {
      userSelectedDate = new Date(selectedDates[0]);
      startBtn.disabled = false;
      // errorMessage.classList.remove('active');
    }
  },
};

flatpickr(datetimePicker, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer({ days, hours, minutes, seconds }) {
  dataDays.textContent = days;
  dataHours.textContent = hours;
  dataiMnutes.textContent = minutes;
  dataSeconds.textContent = seconds;
}

function onStartTimerClick() {
  startBtn.disabled = true;
  const intervalId = setInterval(() => {
    curentData = new Date();
    const differentTime = userSelectedDate - curentData;
    const time = convertMs(differentTime);
    updateTimer(time);
    if (Math.floor(differentTime / 1000) === 0) {
      clearInterval(intervalId);
    }
  }, 1000);
}