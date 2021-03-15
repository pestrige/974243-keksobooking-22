import { showAlert } from './alerts.js';

// Получаем массив данных с сервера
const getData = (onSuccess) => {
  return fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        showAlert(`${response.status} ${response.statusText}`);
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then(data => onSuccess(data))
    .catch(err => showAlert(err));
};

const sendData = (onSuccess, onFail, formData) => {
  fetch('https://22.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.ok ? onSuccess() : onFail())
    .catch(() => onFail());
};

export { getData, sendData };
