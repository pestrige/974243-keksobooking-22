import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { setFiltersActive, setFormActive } from './form-states.js';
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

//Объявляем карту
const map = L.map('map-canvas');

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

// Удаляем маркеры
const removeMarkers = () => {
  markers.forEach((marker) => marker.remove());
};

// Ставим координаты главного маркера в поле адреса
const setAddressCoordinates = (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  const addressCoordinates = `${lat.toFixed(MAX_FLOAT)}, ${lng.toFixed(MAX_FLOAT)}`;
  addressInput.value = addressCoordinates;
};

// Сбрасываем координаты в поле адреса до дефолтных
const resetAddress = () => addressInput.value = `${DEFAULT_COORDINATES.lat}, ${DEFAULT_COORDINATES.lng}`;

// Функция для рендера карт и отслеживания фильтров
const renderOffers = (data) => {
  filtersHandler(data);
  createMarkers(data);
};

// Действия после инициализации карты
const onMapLoad = () => {
  resetAddress();
  setFormActive();
  getData((data) => {
    renderOffers(data);
    setFiltersActive();
  });
};

// Иконки для маркеров
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

// Объявление главного маркера
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

// Сброс координат маркера
const setMarkerDefaults = () => {
  mainPinMarker.setLatLng(DEFAULT_COORDINATES);
};

// Рендерим карту
const createMap = () => {

  //Действия по загрузке карты
  map.on('load', onMapLoad);

  // Устанавливаем внешний вид
  map.setView({
    lat: DEFAULT_COORDINATES.lat,
    lng: DEFAULT_COORDINATES.lng,
  }, 12);

  // Подключаем слои карты
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  // Добавляем главный маркер
  mainPinMarker.addTo(map);

  // Подписываемся на перемещение главного маркера
  mainPinMarker.on('moveend', setAddressCoordinates);
};

export { createMap, MAX_OFFERS_COUNT, resetAddress, setMarkerDefaults, createMarkers, removeMarkers };
