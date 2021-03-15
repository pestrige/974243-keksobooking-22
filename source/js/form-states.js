const addForm = document.querySelector('.ad-form');
const addFormElements = addForm.querySelectorAll('ad-form__element');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFilters = addForm.querySelectorAll('.map__filter');
const mapFeatures = document.querySelector('.map__features');

// Делаем неактивными форму и фильтры
const deactivateForms = () => {
  addForm.classList.add('ad-form--disabled');
  addFormElements.forEach(FormElement => FormElement.disabled = true);

  mapFiltersForm.classList.add('map__filters--disabled');
  mapFilters.forEach(element => element.disabled = true);
  mapFeatures.disabled = true;
};

// Активация формы
const setFormActive = () => {
  addForm.classList.remove('ad-form--disabled');
  addFormElements.forEach(FormElement => FormElement.disabled = false);
};

// Активация фильтров
const setFiltersActive = () => {
  mapFiltersForm.classList.remove('map__filters--disabled');
  mapFilters.forEach(element => element.disabled = false);
  mapFeatures.disabled = false;
};

export { deactivateForms, setFormActive, setFiltersActive };
