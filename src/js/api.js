// import axios from 'axios';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const API_KEY = '37603150-cf2f7acce1783634ed18c2efe';
// const URL_BASE = 'https://pixabay.com/api/';


// async function getImage(query, page) {
//     try {
//         const response = await axios.get(`${URL_BASE}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=200&page=${page}`)
//         return response
//     }
//     catch(error) {
//         console.log(error)
//     }
        
// };

// export default getImage;

import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const API_KEY = '37603150-cf2f7acce1783634ed18c2efe';
const URL_BASE = 'https://pixabay.com/api/';

class PhotoSearchApi{
    constructor() {
        this.page = 1;
        this.searchQuery = '';
        this.loadedHits = 0;
        this.totalHits = 0;
    }

async getImage() {
    try {
        const response = await axios.get(`${URL_BASE}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`);
        const resObjImage = await response.data;
        return resObjImage;
        
    }
    catch(error) {
        console.log(error)
    }
    }
    
    increasePage() {
        return this.page += 1;
    }

    totalLoadHits(loadedHits) {
        return this.loadedHits += loadedHits;
    }

    totalSearchHits(searchHits) {
        return this.totalHits = searchHits;
    }
}

export default PhotoSearchApi;