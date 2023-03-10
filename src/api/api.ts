import axios from 'axios';

const urlNews: string = 'https://newsapi.org/v2/everything';
const API_KEY: string | undefined = process.env.REACT_APP_API_NEWS_KEY;
const pagesShow: number = 20;

const date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
  .toISOString()
  .substring(0, 10);

export const fetchNews = async (query: string) => {
  const { data } = await axios.get(urlNews, {
    params: {
      q: query,
      from: date,
      sortBy: 'publishedAt',
      pageSize: pagesShow,
      apiKey: API_KEY,
    },
  });

  return data;
};
