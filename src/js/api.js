import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const API_KEY = '37603150-cf2f7acce1783634ed18c2efe';
const URL_BASE = 'https://pixabay.com/api/';
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

btnLoadMore.style.display = "none";

function getImage(query) {

    axios.get(`${URL_BASE}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`).then(onMarkup)
};

function onMarkup(obj) {
    const pictureObj = obj.data.hits;

    if (pictureObj.length === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
        pictureObj.map(e => gallery.insertAdjacentHTML("beforeend", OnMarkupCard(e)))
};


function OnMarkupCard(e) {
       return `<div class="photo-card">
  <img src="${e.webformatURL}" alt="${e.tags}" width="300px" height="180px" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span>${e.likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
       <span>${e.views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
       <span>${e.comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
       <span>${e.downloads}</span>
    </p>
  </div>
</div>`
     
};



export default getImage;