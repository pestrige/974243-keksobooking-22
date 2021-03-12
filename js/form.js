const adForm = document.querySelector('.ad-form');
const typeSelect = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const timeinSelect = adForm.querySelector('#timein');
const timeoutSelect = adForm.querySelector('#timeout');

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

typeSelect.addEventListener('change', onTypeSelectChange);
timeinSelect.addEventListener('change', onTimeSelectChange);
timeoutSelect.addEventListener('change', onTimeSelectChange);

