const DEFAULT_AVATAR = '<img src="img/muffin-grey.svg" alt="Аватар пользователя" width="40" height="44">';

const avatarContainer = document.querySelector('.ad-form-header__preview');
const photoContainer = document.querySelector('.ad-form__photo');

// Создаем html элемент с будущей картинкой
const createImg = (imgContainer) => (evt) => {
  const isAvatar = imgContainer.classList.contains('ad-form-header__preview');
  imgContainer.innerHTML = '';

  if (isAvatar) {
    return imgContainer.insertAdjacentHTML(
      'beforeend',
      `<img src="${evt.target.result}"
        alt="Аватар пользователя" width="40" height="44">
      `);
  } else {
    return imgContainer.insertAdjacentHTML(
      'beforeend',
      `<img src="${evt.target.result}"
        alt="Фото жилья" width="70" height="70">
      `);
  }
};

//Обработчик загрузки фото
const imgHandler = (imgContainer) => {
  return (evt) => {
    const input = evt.target;
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = createImg(imgContainer);
    reader.readAsDataURL(file);
    input.value = '';
  }
};

// Очищаем превью фото и аватара
const resetImgContainer = () => {
  avatarContainer.innerHTML = DEFAULT_AVATAR;
  photoContainer.innerHTML = '';
};

export { avatarContainer, photoContainer, imgHandler, resetImgContainer };
