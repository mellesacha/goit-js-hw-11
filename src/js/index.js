import getImage from './api.js'

const form = document.querySelector('#search-form');

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();

    const query = form.elements.searchQuery.value;

    if (query.trim() === '') {
        return
    }
    getImage(query);

    e.currentTarget.reset();
};



 