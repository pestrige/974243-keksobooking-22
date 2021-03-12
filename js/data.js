import { generateInt, generateFloat } from './util.js';

// Генерируем временные данные

const APPARTS_TYPE = ['palace', 'flat', 'house', 'bungalow'];
const TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const APPART_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
const LATITUDE_RANGE = {
  min: 35.00000,
  max: 35.70000,
};
const LONGITUDE_RANGE = {
  min: 139.70000,
  max: 139.80000,
};
const MAX_PRICE = 10000000;
const MAX_ROOMS = 15;
const MAX_GUESTS = 20;

const createOffersArray = (length) => {
  const adsArray = new Array(length).fill('').map(() => createOffer());
  return adsArray;
};

const createOffer = () => {
  const getRandomArrayElement = (array) => array[generateInt(0, array.length - 1)];
  const getFixedLengthArray = (array, startIndex = 0) => {
    const fixedLength = generateInt(startIndex, array.length);
    return array.slice(0, fixedLength);
  };
  const location = {
    x: generateFloat(LATITUDE_RANGE.min, LATITUDE_RANGE.max, 5),
    y: generateFloat(LONGITUDE_RANGE.min, LONGITUDE_RANGE.max, 5),
  }

  return {
    author: {
      avatar: `img/avatars/user0${generateInt(1, 8)}.png`,
    },
    location: {
      x: location.x,
      y: location.y,
    },
    offer: {
      title: 'Шаблон заголовка объявления',
      address: `${location.x}, ${location.y}`,
      price: generateInt(1, MAX_PRICE),
      type: getRandomArrayElement(APPARTS_TYPE),
      rooms: generateInt(1, MAX_ROOMS),
      guests: generateInt(1, MAX_GUESTS),
      checkin: getRandomArrayElement(TIME),
      checkout: getRandomArrayElement(TIME),
      features: getFixedLengthArray(FEATURES),
      photos: getFixedLengthArray(APPART_PHOTOS, 1), // min 1 photo
    },
  };
};

export { createOffersArray };
