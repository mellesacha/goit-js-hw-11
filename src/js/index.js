import PhotoSearchApi from './api.js';
import OnMarkupCard from './markup.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

 
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const stepLoadMore = document.querySelector('.load-more');

const photoSearchApi = new PhotoSearchApi();
let gallerySlider = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

let observer = new IntersectionObserver(onLoad);

form.addEventListener('submit', onSubmit);

async function onSubmit(e) {
    e.preventDefault();

    photoSearchApi.searchQuery = form.elements.searchQuery.value;
    gallery.innerHTML = '';

    if (photoSearchApi.searchQuery === '') {
        return
    };
    onMarkup(await photoSearchApi.getImage());
    onTotalHitsNotification(await photoSearchApi.getImage());

    gallerySlider.refresh();
    observer.observe(stepLoadMore);

    e.target.reset();
}

async function onLoad() {
    await photoSearchApi.increasePage();
    onMarkup(await photoSearchApi.getImage());
}

function onMarkup(obj) {

    try {
       const pictureObj = obj.hits;
        const totalHits = obj.totalHits;

       if (!pictureObj.length) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return
     }
     else {
       pictureObj.map(e => gallery.insertAdjacentHTML("beforeend", OnMarkupCard(e)));
           photoSearchApi.totalLoadHits(pictureObj.length); 
    }

    if (photoSearchApi.loadedHits === totalHits) {
        Notify.info(`We're sorry, but you've reached the end of search results.`)
        } 

        smoothScrollGallery();
    }

    catch(error) {
        console.log(error)
    }
   
};

function onTotalHitsNotification(obj) {
    try {
        const totalHits = obj.totalHits;
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
};


