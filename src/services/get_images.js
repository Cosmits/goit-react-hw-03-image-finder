import axios from 'axios';

export const URL_API = 'https://pixabay.com/api/';
export const API_key = '36447145-713fd0865ba966cc8244c878c';
export const perPage = 12;

export async function getImages(searchQuery, page = 1) {
  return axios({
    method: `GET`,
    url: `${URL_API}`,
    headers: {
      'Content-Type': `application/json`,
      'Accept': `application/json`,
    },

    // ?key=36447145-713fd0865ba966cc8244c878c&q=cats&image_type=photo&orientation=horizontal&safesearch=true
    params: {
      key: `${API_key}`,
      q: `${searchQuery}`,
      image_type: `photo`,
      orientation: `horizontal`,
      safesearch: true,
      per_page: +`${perPage}`,
      page: +`${page}`,

    },
  })
}
