import PhotoSearchApi from './api.js';
import OnMarkupCard from './markup.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

 
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

const photoSearchApi = new PhotoSearchApi();
let gallerySlider = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

form.addEventListener('submit', onSubmit);
btnLoadMore.addEventListener('click', onLoadBtn);

async function onSubmit(e) {
    e.preventDefault();

    photoSearchApi.searchQuery = form.elements.searchQuery.value;
    gallery.innerHTML = '';
    btnLoadMore.classList.add('is-hidden');

    if (photoSearchApi.searchQuery === '') {
        return
    };
    onMarkup(await photoSearchApi.getImage());
    onTotalHitsNotification(await photoSearchApi.getImage());

    gallerySlider.refresh();

    e.target.reset();
}

async function onLoadBtn() {
    await photoSearchApi.increasePage();
    onMarkup(await photoSearchApi.getImage());
}

async function onMarkup(obj) {

    try {
       const pictureObj = await obj.hits;
        const totalHits = await obj.totalHits;

       if (!pictureObj.length) {
        btnLoadMore.classList.add('is-hidden');
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return
     }
     else {
       pictureObj.map(e => gallery.insertAdjacentHTML("beforeend", OnMarkupCard(e)));
        btnLoadMore.classList.remove('is-hidden');
           photoSearchApi.totalLoadHits(pictureObj.length); 
           
    }

    if (photoSearchApi.loadedHits === totalHits) {
        btnLoadMore.classList.add('is-hidden');
        Notify.info(`We're sorry, but you've reached the end of search results.`)
        } 

        smoothScrollGallery();
    }

    catch(error) {
        console.log(error)
    }
   
};

async function onTotalHitsNotification(obj) {
    try {
        const totalHits = await obj.totalHits;
    photoSearchApi.totalSearchHits(totalHits)
    Notify.info(`Hooray! We found ${totalHits} images.`)
    }
    catch(error) {
        console.log(error)
    }
};

function smoothScrollGallery() {
  const { height } = gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}