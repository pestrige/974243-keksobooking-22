import { isEscEvent } from './util.js';

const ALERT_SHOW_TIME = 5000;

const mainPage = document.querySelector('main');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

// Показываем сообщение об ошибке
const showAlert = (err) => {
  const alertContainer = document.createElement('div');

  alertContainer.classList.add('alert-message');
  alertContainer.textContent = `Ошибка: ${err}. Попробуйте позднее`;

  mainPage.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Закрытие по Esc
const onWindowKeyup = (messageContainer) => {
  return (evt) => {
    if (isEscEvent(evt)) {
      messageContainer.remove();
    }
  }
};

// Показываем окно успешной загрузки
const showSuccessPopup = () => {
  const successContainer = successTemplate.cloneNode(true);
  mainPage.appendChild(successContainer);

  successContainer.addEventListener('click', () => successContainer.remove(), {once: true});
  window.addEventListener('keyup', onWindowKeyup(successContainer), {once: true});
};

// Показываем окно ошибки загрузки
const showErrorPopup = () => {
  const errorContainer = errorTemplate.cloneNode(true);
  const closeButton = errorContainer.querySelector('.error__button');

  mainPage.appendChild(errorContainer);
  errorContainer.addEventListener('click', () => errorContainer.remove(), {once: true});
  closeButton.addEventListener('click', () => errorContainer.remove(), {once: true});
  window.addEventListener('keyup', onWindowKeyup(errorContainer), {once: true});
};

export { showAlert, showSuccessPopup, showErrorPopup };
