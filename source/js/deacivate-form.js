const addForm = document.querySelector('.ad-form');
const addFormElements = addForm.querySelectorAll('ad-form__element');

const mapFiltersForm = document.querySelector('.map__filters');
const mapFilters = addForm.querySelectorAll('.map__filter');
const mapFeatures = document.querySelector('.map__features');

addForm.classList.add('ad-form--disabled');
addFormElements.forEach(FormElement => FormElement.disabled = true);

mapFiltersForm.classList.add('map__filters--disabled');
mapFilters.forEach(element => element.disabled = true);
mapFeatures.disabled = true;

