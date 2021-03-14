/* global L:readonly */
import { setFormActive, setFiltersActive } from './form-states.js';
import { createOffer } from './create-offer.js';
import { getData } from './data.js';
import { filtersHandler } from './filters.js';

const MAX_FLOAT = 5;
const DEFAULT_COORDINATES = {
  lat: 35.66332,
  lng: 139.78141,
};
const MAX_OFFERS_COUNT = 10;

const addressInput = document.querySelector('#address');
const markers = [];
//const slicedMarkers = [];

const resetAddress = () => addressInput.value = `${DEFAULT_COORDINATES.lat}, ${DEFAULT_COORDINATES.lng}`;

// Создаем маркеры и добавляем их на карту
const createMarkers = (offersArray) => {
  const slicedOffersArray = offersArray.slice(0, MAX_OFFERS_COUNT);

  slicedOffersArray.forEach((offer) => {
    const { location } = offer;
    const marker = L.marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        icon: customPinIcon,
      },
    );
    markers.push(marker);

    // Добавляем маркеры с балунами
    marker
      .addTo(map)
      .bindPopup(createOffer(offer));
  });
};

const removeMarkers = () => {
  markers.forEach((marker) => marker.remove());
};

// Обертка для рендера карт и отслеживания фильтров
const renderOffers = (data) => {
  //console.log(data);
  filtersHandler(data);
  createMarkers(data);
};

// Действия после загрузке карты
const onMapLoad = () => {
  resetAddress();
  setFormActive();
  getData((data) => {
    //console.log(data);
    renderOffers(data);
    setFiltersActive();
  });
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
    lat: DEFAULT_COORDINATES.lat,
    lng: DEFAULT_COORDINATES.lng,
  }, 12)
  .on('load', onMapLoad());

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
    lat: DEFAULT_COORDINATES.lat,
    lng: DEFAULT_COORDINATES.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const setMarkerDefaults = () => {
  mainPinMarker.setLatLng(DEFAULT_COORDINATES);
};

// Добавляем слои от OpenStreetMap
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Добавляем главный маркер
mainPinMarker.addTo(map);

// Подписываемся на перемещение главного маркера
mainPinMarker.on('moveend', setAddressCoordinates);

export { MAX_OFFERS_COUNT, resetAddress, setMarkerDefaults, createMarkers, removeMarkers };
