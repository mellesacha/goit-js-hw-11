import { Notify } from 'notiflix/build/notiflix-notify-aio';

const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

export default async function onMarkupGallery(promise) {
   
    await promise.
        then(res => { return res.data.hits }).
        then(onMarkup).
        catch(error => console.log(error))
    
};

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

