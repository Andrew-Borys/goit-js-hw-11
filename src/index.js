import './sass/main.scss';
import imageTpl from './template/image-tpl';
import ImagesApiService from './pixabay-service';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const axios = require('axios');

const formRef = document.querySelector('.search-form');
const galleryRef = document.querySelector('.gallery');
const loadMoreBtnRef = document.querySelector('.btn-load-more');

formRef.addEventListener('submit', onSearch);
loadMoreBtnRef.addEventListener('click', onLoadMore);

const imagesApiService = new ImagesApiService();

loadMoreBtnRef.classList.add('is-hidden');

function onSearch(e) {
  e.preventDefault();

  clearScreen();

  imagesApiService.query = e.currentTarget.searchQuery.value;
  imagesApiService.resetPage();
  imagesApiService.getImages().then(images => {
    appendImageMarkUp(images);
    loadMoreBtnRef.classList.remove('is-hidden');
  });
}

function onLoadMore() {
  imagesApiService.getImages().then(appendImageMarkUp);
}

function appendImageMarkUp(images) {
  galleryRef.insertAdjacentHTML('beforeend', imageTpl(images));
  galleryMagic.refresh();
}

function clearScreen(params) {
  galleryRef.innerHTML = '';
}

const galleryMagic = new SimpleLightbox('.gallery__link', {
  captionDelay: 250,
});
