import axios from 'axios';

const URL: string = 'https://newsapi.org/v2/everything';
const API_KEY: string | undefined = '0126b0afba5f46b89f1757450ba59287';
const querySearch: string = 'telsa';
const pagesShow: number = 20;

const date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
  .toISOString()
  .substr(0, 10);

export const fetchNews = async () => {
  const { data } = await axios.get(URL, {
    params: {
      q: querySearch,
      from: date,
      sortBy: 'publishedAt',
      pageSize: pagesShow,
      apiKey: API_KEY,
    },
  });

  console.log("data", data);
  

  return data;
};
