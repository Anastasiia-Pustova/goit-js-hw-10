import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorMessage from '../img/error-message.svg';
import fulfilledMessage from '../img/fulfilled-message.svg';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const promise = new Promise((resolve, reject) => {
    if (form.elements.state.value === 'fulfilled') {
      resolve(form.elements.delay.value);
    } else {
      reject(form.elements.delay.value);
    }
  });

  promise
    .then(delay => {
      setTimeout(() => {
        iziToast.show({
          message: `Fulfilled promise in ${delay}ms`,
          position: 'topRight',
          backgroundColor: '#59A10D',
          titleColor: '#fff',
          titleSize: '16px',
          titleLineHeight: '24px',
          messageColor: '#fff',
          messageSize: '16px',
          messageLineHeight: '24px',
          iconUrl: fulfilledMessage,
          timeout: 5000,
        });
      }, delay);
      form.elements.delay.value = '';
    })
    .catch(delay => {
      setTimeout(() => {
        iziToast.show({
          message: `Rejected promise in ${delay}ms`,
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
      }, delay);
      form.elements.delay.value = '';
    });
}