// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

import axios from 'axios';

const perPage = 12;
const imageType = 'photo';
const orientation = 'horizontal';

axios.defaults.baseURL = `https://pixabay.com/api/`;

export const searchImage = async query => {
  const response = await axios.get(
    `?q=${query}&page=1&key=29520671-c96ba25b52e4cbbca2f07c463&image_type=${imageType}&orientation=${orientation}&per_page=${perPage}`
  );
  return response.data;
};