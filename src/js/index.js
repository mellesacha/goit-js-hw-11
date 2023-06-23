// import getImage from './api.js'
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const form = document.querySelector('#search-form');
// const gallery = document.querySelector('.gallery');
// const btnLoadMore = document.querySelector('.load-more');

// let page = 1;
// let loadedHits = 0;


// form.addEventListener('submit', onSubmit);

// function onSubmit(e) {
//     e.preventDefault();

//     const query = form.elements.searchQuery.value;
//     gallery.innerHTML = '';
//     btnLoadMore.classList.add('is-hidden')

//     if (query.trim() === '') {
//         return
//     }
//     getImage(query, page).then(onMarkup).catch(console.log('a'));


//     btnLoadMore.addEventListener('click', onClickBtn);

//     function onClickBtn() {
//         try {
//         page += 1;
//         getImage(query, page).then(onMarkup)
//         }

//         catch {
//             Notify.info(`We're sorry, but you've reached the end of search results.`)
//         }
//     }
//     e.currentTarget.reset();
// }

// async function onMarkup(obj) {
//     try {
//         const pictureObj = await obj.data.hits;  
//         const totalHits = obj.data.totalHits;
        
//         if (pictureObj.length === 0) {
//         Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//     }

//     else {
//         pictureObj.map(e => gallery.insertAdjacentHTML("beforeend", OnMarkupCard(e)))
//             btnLoadMore.classList.remove('is-hidden')
//             loadedHits += obj.data.hits.length

//          if (loadedHits === totalHits) {
//             btnLoadMore.classList.add('is-hidden')
//         }
//     }
//     }
//     catch (error) {
//         console.error;
//     }

    
// };


// function OnMarkupCard(e) {
//        return `<div class="photo-card">
//   <img src="${e.webformatURL}" alt="${e.tags}" width="300px" height="180px" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>
//       <span>${e.likes}</span>
//     </p>
//     <p class="info-item">
//       <b>Views</b>
//        <span>${e.views}</span>
//     </p>
//     <p class="info-item">
//       <b>Comments</b>
//        <span>${e.comments}</span>
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>
//        <span>${e.downloads}</span>
//     </p>
//   </div>
// </div>`
     
// };

import PhotoSearchApi from './api.js';
import onMarkupGallery from './markup.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
 
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

const photoSearchApi = new PhotoSearchApi();

form.addEventListener('submit', onSubmit);
btnLoadMore.addEventListener('click', onLoadBtn);

function onSubmit(e) {
    e.preventDefault();

    photoSearchApi.searchQuery = form.elements.searchQuery.value;
    gallery.innerHTML = '';
    btnLoadMore.classList.add('is-hidden');

    if (photoSearchApi.searchQuery === '') {
        return
    }

    // onMarkupGallery(photoSearchApi.getImage());
    //  console.log(photoSearchApi.getObj())
    onMarkup(photoSearchApi.getImage())

    e.currentTarget.reset();
}

function onLoadBtn() {
    photoSearchApi.increasePage();
    // onMarkupGallery(photoSearchApi.getImage());
   
}

function onMarkup(obj) {

    if (!obj.length) {
        btnLoadMore.classList.add('is-hidden');
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return
    }

    obj.map(e => gallery.insertAdjacentHTML("beforeend", OnMarkupCard(e)));
    btnLoadMore.classList.remove('is-hidden');

}
  
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

