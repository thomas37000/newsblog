import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IArticle from './interfaces/ArticleInterface';
import IFavorite from './interfaces/FavoriteInterface';
import { fetchNews } from './api/api';
import CardArticle from './components/CardArticle';

const Home: React.FunctionComponent = () => {
  const [news, setNews] = useState<IArticle[] | null>(null);
  // console.log('state news', news);
  const [newsShow, setNewsShow] = useState<number>(50);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<boolean>(true);

  /******************************/
  const Url: string = 'https://newsapi.org/v2/everything';

  /******************************/
  // ne marche pas avec query ?
  const UrlCountry: string =
    'https://newsapi.org/v2/top-headlines?country=fr&everything';
  /******************************/

  const query: string | null = '';

  const API_KEY: string | undefined = process.env.REACT_APP_API_KEY;

  const date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substr(0, 10);

  useEffect(() => {
    const loadData = () => {
      setLoading(true);
      axios
        .get(
          `${UrlCountry}?q=${query}&from=${date}&sortBy=publishedAt&pageSize=${newsShow}&apiKey=${API_KEY}`
        )
        .then((res) => {
          setError('');
          // console.log('DATA', res.data.articles);
          setNews(res.data.articles);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    };

    loadData();
  }, [API_KEY, date, newsShow]);

  const fetchArticles =
    news &&
    news.map((article, i) => {
      return <CardArticle key={i} article={article} />;
    });

  /*********** SEARCH *************/

  // const search = async (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === 'Enter') {
  //     const res = await fetchNews();
  //     setNews(res);
  //     console.log('api', res);
  //   }
  // };

  // const searchNews = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   setNews(e.target.value);
  // };

  /*********** Input Range *************/
  const changeNumberOfNews = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewsShow(+event.target.value);
  };

  if (loading) return <p>"Loading ..."</p>;
  if (error !== '') return <p>{error}</p>;
  if (!news) return <p>"Problème avec l' Api..."</p>;

  return (
    <>
      {/* <div className='search'>
        <input
          type='text'
          name='search'
          id='searchBar'
          className='search-bar'
          placeholder='Rechercher une ville ...'
          // onChange={searchNews}
          onKeyPress={search}
        />
        <label
          htmlFor='searchBar
  '
          className='searchIcon'
        ></label>
      </div> */}
      <div className='w-96'>
        <label
          htmlFor='filter the news'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          Changer le nombre de news
        </label>

        <input
          id='small-range'
          type='range'
          min={1}
          max={100}
          value={newsShow}
          defaultValue={newsShow}
          onChange={changeNumberOfNews}
          className='w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700'
        />
      </div>

      <div className='flex flex-wrap space-x-4 space-y-4'>{fetchArticles}</div>
    </>
  );
};

export default Home;
