import images from './gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');
// const modalRef = document.querySelector('.lightbox');

// 1.Создание и рендер разметки по массиву данных и предоставленному шаблону.
//  вариант 1
const createGallery = image => {
  const galleryItem = document.createElement('li');
  galleryItem.classList.add('gallery__item');
  const galleryLink = document.createElement('a');
  galleryLink.classList.add('gallery__link');
  galleryLink.setAttribute('href', image.original);
  galleryItem.append(galleryLink);
  const galleryImage = document.createElement('img');
  galleryImage.classList.add('gallery__image');
  galleryImage.setAttribute('src', image.preview);
  galleryImage.dataset.source = image.original;
  galleryImage.setAttribute('alt', image.description);
  galleryLink.append(galleryImage);
  galleryRef.append(galleryItem);
  return galleryItem;
};

const galleryList = images.map(image => createGallery(image));

galleryRef.append(...galleryList);
console.log(galleryRef);
//  вариант 2

// const createGalleryItem = images.map(
//   item =>
//     `<li class="gallery__item"> <a class="gallery__link" href = "${item.original}"> <img class="gallery__image" src = "${item.preview}" data-source="${item.original}" alt="${item.description}"/> </a> </li>`,
// );
// galleryRef.insertAdjacentHTML('beforeend', [...createGalleryItem].join(''));

// 2.Pеализация делегирования на галерее ul.js-gallery и получение url большого изображения.

galleryRef.addEventListener('click', clickOnImage);

function clickOnImage(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') return;
  const originalImgUrl = event.target.dataset.source;
  const itemDescr = event.target.alt;
  //   console.log(originalImgUrl);
  //   console.log(itemDescr);
  changeAttributes(originalImgUrl, itemDescr);
}
// 3.Открытие модального окна по клику на элементе галереи.
const lightBox = document.querySelector('.js-lightbox');
const lightBoxImage = document.querySelector('.lightbox__image');
galleryRef.addEventListener('click', openModal);

// 4. Подмена значения атрибута src элемента img.lightbox__image.
const changeAttributes = (url, alt) => {
  lightBoxImage.setAttribute('src', `${url}`);
  lightBoxImage.setAttribute('alt', `${alt}`);
};
function openModal(event) {
  window.addEventListener('keydown', closeModalEsc);
  if (event.target.nodeName !== 'IMG') return;
  lightBox.classList.add('is-open');
  // console.log(lightBox);
}

// 5 Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
const closeBtnRef = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const closeByClickOnOverlay = document.querySelector('.lightbox__overlay');
closeBtnRef.addEventListener('click', closeModal);
closeByClickOnOverlay.addEventListener('click', closeModalOverlay);

function closeModal() {
  window.removeEventListener('keydown', closeModalEsc);
  lightBox.classList.remove('is-open');
  changeAttributes();
}

function closeModalOverlay(event) {
  if (!event.target === event.currentTarget) return;
  closeModal();
}

function closeModalEsc(event) {
  if (event.key !== 'Escape') return;
  closeModal();
}
