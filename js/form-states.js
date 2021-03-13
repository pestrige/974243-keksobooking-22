const addForm = document.querySelector('.ad-form');
const addFormElements = addForm.querySelectorAll('ad-form__element');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFilters = addForm.querySelectorAll('.map__filter');
const mapFeatures = document.querySelector('.map__features');

// const setFormInactive = () => {
//   addForm.classList.add('ad-form--disabled');
//   addFormElements.forEach(FormElement => FormElement.disabled = true);
// };

const setFormActive = () => {
  addForm.classList.remove('ad-form--disabled');
  addFormElements.forEach(FormElement => FormElement.disabled = false);
};

// const setFiltersInactive = () => {
//   mapFiltersForm.classList.add('map__filters--disabled');
//   mapFilters.forEach(element => element.disabled = true);
//   mapFeatures.disabled = true;
// };

const setFiltersActive = () => {
  mapFiltersForm.classList.remove('map__filters--disabled');
  mapFilters.forEach(element => element.disabled = false);
  mapFeatures.disabled = false;
};

export {setFormActive, setFiltersActive };
