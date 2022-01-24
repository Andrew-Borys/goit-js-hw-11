const axios = require('axios');
import Notiflix from 'notiflix';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  getImages() {
    const KEY = '25338128-340729dab9479fd19989242a2';
    const URL = 'https://pixabay.com/api/';
    const PARAMETERS_QUERY = 'image_type=photo&orientation=horizontal&safesearch=true';
    const PAGINATION = `per_page=40&page=${this.page}`;

    return axios
      .get(`${URL}?key=${KEY}&q=${this.searchQuery}&${PARAMETERS_QUERY}&${PAGINATION}`)
      .then(res => {
        this.page += 1;
        if (res.data.total === 0) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.',
          );
        }

        return res.data.hits;
      })
      .catch(error => error.message);
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
