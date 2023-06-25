export default function OnMarkupCard(e) {
    return `<div class="photo-card">
  <a href="${e.largeImageURL}">
  <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
  </a>
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
</div>`;
     
};