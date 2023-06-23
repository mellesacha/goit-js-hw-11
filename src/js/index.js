import getImage from './api.js'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// import SearchImageApi from './api.js'

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');


form.addEventListener('submit', onSubmit);

// const searchImageApi = new SearchImageApi();

let page = 1;

function onSubmit(e) {
    e.preventDefault();

    const query = form.elements.searchQuery.value;
    gallery.innerHTML = '';
    btnLoadMore.classList.add('is-hidden')

    if (query.trim() === '') {
        return
    }
    getImage(query, page).then(onMarkup).catch(console.log('a'));

    btnLoadMore.addEventListener('click', onClickBtn);

    function onClickBtn() {
        page += 1;
        getImage(query, page).then(onMarkup).catch(console.log('n'))
        // console.log(getImage(query, page).then(b))
    }
    e.currentTarget.reset();
}

// function b(obj) {
//     return console.log(obj.data.totalHits) 
// }
    




function onMarkup(obj) {
    const pictureObj = obj.data.hits;

    if (pictureObj.length === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }

    else {
        pictureObj.map(e => gallery.insertAdjacentHTML("beforeend", OnMarkupCard(e)))
        btnLoadMore.classList.remove('is-hidden')
    }
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

 