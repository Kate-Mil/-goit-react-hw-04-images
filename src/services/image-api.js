import axios from 'axios';

const API_KEY = '34900883-94108098f0e7f8bd03a1699df';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const ADD_API_REQUEST = 'image_type=photo&orientation=horizontal';

export const fetchImage = async (query, page) => {
  const response = await axios.get(
    `?q=${query}&page=1&key=${API_KEY}&${ADD_API_REQUEST}&per_page=12&page=${page}`
  );
  return response.data;
};
