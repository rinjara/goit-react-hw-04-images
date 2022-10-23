import axios from 'axios';

const perPage = 12;
const imageType = 'photo';
const orientation = 'horizontal';
const KEY = `29520671-c96ba25b52e4cbbca2f07c463`;

axios.defaults.baseURL = `https://pixabay.com/api/`;

export const searchImage = async (query, page) => {
  const response = await axios.get(
    `?q=${query}&page=${page}&key=${KEY}&image_type=${imageType}&orientation=${orientation}&per_page=${perPage}`
  );
  return response.data;
};
