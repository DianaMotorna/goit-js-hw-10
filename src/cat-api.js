import axios from 'axios';

const API_KEY =
  'live_CLuRfyQrXHkH7xd0jXhYxLgLymkwHXzxogAWsszZgrVFlLUvuOSymvV9Vb21I76i';

axios.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds');
}

export function fetchCatByBreed(breedId) {
  return axios.get(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  );
}
