/* global L:readonly */
import { setFormActive } from './form-states.js';
import { offersArray, createOffer } from './render-offers.js';

const MAX_FLOAT = 5;
const CENTER_TOKIO_LAT = 35.66332;
const CENTER_TOKIO_LNG = 139.78140;

const addressInput = document.querySelector('#address');

const onMapLoad = () => {
  setFormActive();
  addressInput.value = `${CENTER_TOKIO_LNG}, ${CENTER_TOKIO_LNG}`;
};

// Ставим координаты главного маркера в поле адреса
const setAddressCoordinates = (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  const addressCoordinates = `${lat.toFixed(MAX_FLOAT)}, ${lng.toFixed(MAX_FLOAT)}`;
  addressInput.value = addressCoordinates;
};

//Инициализируем карту с маркерами
const map = L.map('map-canvas')
  .setView({
    lat: CENTER_TOKIO_LAT,
    lng: CENTER_TOKIO_LNG,
  }, 12)
  .on('load', onMapLoad()); // действие после загрузки карты

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const customPinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.66332,
    lng: 139.78140,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

// Добавляем слои от OpenStreetMap
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Добавляем главный маркер
mainPinMarker.addTo(map);

// Рисуем маркеры объявлений
offersArray.forEach((offer) => {
  const {location} = offer;
  const marker = L.marker(
    {
      lat: location.x,
      lng: location.y,
    },
    {
      icon: customPinIcon,
    },
  );

  // Добавляем маркеры с балунами
  marker
    .addTo(map)
    .bindPopup(createOffer(offer));
});

// Подписываемся на перемещение главного маркера
mainPinMarker.on('moveend', setAddressCoordinates);
