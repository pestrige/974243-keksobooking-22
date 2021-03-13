import { debounce } from './util.js';
import { resetAddress, setMarkerDefaults } from './map.js';
import { showSuccessPopup, showErrorPopup } from './messages.js';
import { sendData } from './data.js';
import { filtersForm } from './filters.js';

const CHECK_DELAY = 500;
const PALACE_ROOMS = 100;

const adForm = document.querySelector('.ad-form');
const typeSelect = adForm.querySelector('#type');
const titleInput = adForm.querySelector('#title');
const priceInput = adForm.querySelector('#price');
const timeinSelect = adForm.querySelector('#timein');
const timeoutSelect = adForm.querySelector('#timeout');
const roomsSelect = adForm.querySelector('#room_number');
const guestsSelect = adForm.querySelector('#capacity');

// Устанавливаем минимальную цену
const setInputMinPrice = (minValue) => {
  priceInput.placeholder = minValue;
  priceInput.min = minValue;
};

// Условия минимальной цены по типам жилья
const onTypeSelectChange = (evt) => {
  const value = evt.target.value;
  switch (value) {
    case 'bungalow':
      return setInputMinPrice('0');
    case 'flat':
      return setInputMinPrice('1000');
    case 'house':
      return setInputMinPrice('5000');
    case 'palace':
      return setInputMinPrice('10000');
  }
};

// Устанавливаем одинаковое время въезда-выезда
const onTimeSelectChange = (evt) => {
  const value = evt.target.value;
  timeinSelect.value = value;
  timeoutSelect.value = value;
};

// Проверяем заголовок
const onTitleInput = (evt) => {
  const field = evt.target;
  const titleLength = field.value.length;
  const titleMinLength = field.minLength;
  const titleMaxLength = field.maxLength;

  if (titleLength < titleMinLength) {
    field.setCustomValidity(`Минимальная длина заголовка ${titleMinLength}, введите еще ${titleMinLength - titleLength} симв.`);
  } else if (titleLength > titleMaxLength) {
    field.setCustomValidity(`Максимальная длина заголовка ${titleMaxLength}, удалите ${titleLength - titleMaxLength} симв.`);
  } else {
    field.setCustomValidity('');
  }
  field.reportValidity();
};
const onTitleInputDebouncedInput = debounce(onTitleInput, CHECK_DELAY);

// Проверяем цену
const onPriceInput = (evt) => {
  const field = evt.target;
  const price = field.value;
  const priceMin = Number(field.min);
  const priceMax = Number(field.max);

  if (price < priceMin) {
    field.setCustomValidity(`Минимальная цена ${priceMin}`);
  } else if (price > priceMax) {
    field.setCustomValidity(`Максимальная цена ${priceMax}`);
  } else {
    field.setCustomValidity('');
  }
  field.reportValidity();

};
const onPriceInputDebouncedInput = debounce(onPriceInput, CHECK_DELAY);

// Проверяем соответствие комнат и гостей
const onSelectChange = (evt) => {
  const currentField = evt.target;
  const roomsCount = Number(roomsSelect.value);
  const guestsCount = Number(guestsSelect.value);
  const isPalace = roomsCount === PALACE_ROOMS;

  roomsSelect.setCustomValidity('');
  guestsSelect.setCustomValidity('');

  if (roomsCount < guestsCount && guestsCount !== 0) {
    currentField.setCustomValidity('Количество комнат не соответствует числу гостей');
  } else if ((isPalace && guestsCount !== 0)) {
    currentField.setCustomValidity('100 комнат не для гостей');
  } else if (!isPalace && guestsCount === 0) {
    currentField.setCustomValidity('Доступно только для 100 комнат');
  } else {
    currentField.setCustomValidity('');
  }
  currentField.reportValidity();
};

// Функция очистки формы
const resetForm = (evt) => {
  evt.target.reset();
  setTimeout(() => resetAddress(), 0);
  setMarkerDefaults();
  filtersForm.reset();
};

//Очищаем форму
const onFormReset = (evt) => resetForm(evt);

// Отправляем форму
const onFormSubmit = (evt) => {
  evt.preventDefault();

  sendData(
    () => {
      resetForm(evt);
      showSuccessPopup();
    },
    () => {
      showErrorPopup();
    },
    new FormData(evt.target),
  );
};

typeSelect.addEventListener('change', onTypeSelectChange);
timeinSelect.addEventListener('change', onTimeSelectChange);
timeoutSelect.addEventListener('change', onTimeSelectChange);
titleInput.addEventListener('input', onTitleInputDebouncedInput);
priceInput.addEventListener('input', onPriceInputDebouncedInput);
roomsSelect.addEventListener('change', onSelectChange);
guestsSelect.addEventListener('change', onSelectChange);

adForm.addEventListener('reset', onFormReset);
adForm.addEventListener('submit', onFormSubmit);
