const addForm = document.querySelector('.ad-form');
const avatarInput = addForm.querySelector('#avatar');
const titleInput = addForm.querySelector('#title');
const addressInput = addForm.querySelector('#address');
const typeSelect = addForm.querySelector('#type');
const priceInput = addForm.querySelector('#price');
const timeinSelect = addForm.querySelector('#timein');
const timeoutSelect = addForm.querySelector('#timeout');
const roomsSelect = addForm.querySelector('#room_number');
const guestsSelect = addForm.querySelector('#capacity');
const featuresFieldset = addForm.querySelector('.features');
const descriptionTextarea = addForm.querySelector('#description');
const photosInput = addForm.querySelector('#images');
const submitFieldset = addForm.querySelector('.ad-form__element--submit');

const mapFiltersForm = document.querySelector('.map__filters');
const typeFilterSelect = mapFiltersForm.querySelector('#housing-type');
const priceFilterSelect = mapFiltersForm.querySelector('#housing-price');
const roomsFilterSelect = mapFiltersForm.querySelector('#housing-rooms');
const guestsFilterSelect = mapFiltersForm.querySelector('#housing-guests');
const featuresFilterFieldset = mapFiltersForm.querySelector('#housing-features');

const setInactive = () => {
  // Отключаем поля формы
  addForm.classList.add('ad-form--disabled');
  avatarInput.disabled = true;
  titleInput.disabled = true;
  addressInput.disabled = true;
  typeSelect.disabled = true;
  priceInput.disabled = true;
  timeinSelect.disabled = true;
  timeoutSelect.disabled = true;
  roomsSelect.disabled = true;
  guestsSelect.disabled = true;
  featuresFieldset.disabled = true;
  descriptionTextarea.disabled = true;
  photosInput.disabled = true;
  submitFieldset.disabled = true;
  mapFiltersForm.disabled = true;

  //Отключаем фильтры
  mapFiltersForm.classList.add('map__filters--disabled');
  typeFilterSelect.disabled = true;
  priceFilterSelect.disabled = true;
  roomsFilterSelect.disabled = true;
  guestsFilterSelect.disabled = true;
  featuresFilterFieldset.disabled = true;
};

const setActive = () => {
  addForm.classList.remove('ad-form--disabled');
  avatarInput.disabled = false;
  titleInput.disabled = false;
  addressInput.disabled = false;
  typeSelect.disabled = false;
  priceInput.disabled = false;
  timeinSelect.disabled = false;
  timeoutSelect.disabled = false;
  roomsSelect.disabled = false;
  guestsSelect.disabled = false;
  featuresFieldset.disabled = false;
  descriptionTextarea.disabled = false;
  photosInput.disabled = false;
  submitFieldset.disabled = false;
  mapFiltersForm.disabled = false;

  mapFiltersForm.classList.remove('map__filters--disabled');
  typeFilterSelect.disabled = false;
  priceFilterSelect.disabled = false;
  roomsFilterSelect.disabled = false;
  guestsFilterSelect.disabled = false;
  featuresFilterFieldset.disabled = false;
};

export { setInactive, setActive };
