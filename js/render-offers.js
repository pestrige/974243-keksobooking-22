import { createOffersArray } from './data.js';

const mapCanvas = document.querySelector('#map-canvas');
const tempOffersContainer = document.createDocumentFragment();

// Создаем массив из данных о 10 объявлениях
const offersArray = createOffersArray(10);

// Получаем иконки удобств на основе данных
const getOfferFeatures = (featuresArray) => {
  let featuresTextList = '';
  featuresArray.forEach((item) => {
    switch (item) {
      case 'wifi':
        featuresTextList += '<li class="popup__feature popup__feature--wifi"></li>';
        break;
      case 'dishwasher':
        featuresTextList += '<li class="popup__feature popup__feature--dishwasher"></li>';
        break;
      case 'parking':
        featuresTextList += '<li class="popup__feature popup__feature--parking"></li>';
        break;
      case 'washer':
        featuresTextList += '<li class="popup__feature popup__feature--washer"></li>';
        break;
      case 'elevator':
        featuresTextList += '<li class="popup__feature popup__feature--elevator"></li>';
        break;
      case 'conditioner':
        featuresTextList += '<li class="popup__feature popup__feature--conditioner"></li>';
        break;
    }
  });
  return featuresTextList;
};

// Получаем HTML элементы фоток объявления
const getOfferPhotos = (photosAray) => {
  let photosTextList = '';
  photosAray.forEach((item) => {
    photosTextList += `<img src="${item}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
  });
  return photosTextList;
};

// Определяем тип помещения
const getOfferType = (offerType) => {
  let type = '';
  switch (offerType) {
    case 'flat':
      return type = 'Квартира';
    case 'bungalow':
      return type = 'Бунгало';
    case 'palace':
      return type = 'Дворец';
    case 'house':
      return type = 'Дом';
  }

  return type;
};

// Заполняем объявление временными данными
const fillOffer = ({author, offer}) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);
  const avatar = cardTemplate.querySelector('.popup__avatar');
  const title = cardTemplate.querySelector('.popup__title');
  const description = cardTemplate.querySelector('.popup__description');
  const address = cardTemplate.querySelector('.popup__text--address');
  const price = cardTemplate.querySelector('.popup__text--price');
  const capacity = cardTemplate.querySelector('.popup__text--capacity');
  const time = cardTemplate.querySelector('.popup__text--time');
  const type = cardTemplate.querySelector('.popup__type');
  const features = cardTemplate.querySelector('.popup__features');
  const photosContainer = cardTemplate.querySelector('.popup__photos');

  avatar.src = author.avatar;
  title.textContent = offer.title;
  description.textContent = offer.description;
  address.textContent = offer.address;
  price.firstChild.textContent = `${offer.price} `;
  capacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  time.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  type.textContent = getOfferType(offer.type);
  features.innerHTML = getOfferFeatures(offer.features);
  photosContainer.innerHTML = getOfferPhotos(offer.photos);

  tempOffersContainer.appendChild(cardTemplate);
};

// Рендерим первое объявление на карту
// const renderFirstOffer = () => {
//   mapCanvas.appendChild(tempOffersContainer.firstChild);
// };

offersArray.forEach((item) => {
  //console.log(item);
  fillOffer(item);
});

//renderFirstOffer();
//console.log(tempOffersContainer);

