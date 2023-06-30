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

const options = {
  root: null, 
  rootMargin: '0px',
  threshold: 1.0, 
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    console.log(entry.isIntersecting);
    if (entry.isIntersecting) {
      onLoad();
    }
  });
}, options);

form.addEventListener('submit', onSubmit);

async function onSubmit(e) {
    e.preventDefault();

    photoSearchApi.searchQuery = form.elements.searchQuery.value;
    gallery.innerHTML = '';
    const images = await photoSearchApi.getImage()

    if (photoSearchApi.searchQuery === '') {
        return
    };

    onMarkup(images);
    onTotalHitsNotification(images);

    gallerySlider.refresh();
    observer.observe(gallery.lastElementChild);

    e.target.reset();
}

async function onLoad() {
    await photoSearchApi.increasePage();
    onMarkup(await photoSearchApi.getImage());
     observer.observe(gallery.lastElementChild);
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
    top: height,
    behavior: 'smooth',
  });
};


