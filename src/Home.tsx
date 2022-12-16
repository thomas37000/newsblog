import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IArticle from './interfaces/ArticleInterface';
import IFavorite from './interfaces/FavoriteInterface';
import { fetchNews } from './api/api';
import CardArticle from './components/CardArticle';

function Home() {
  const [news, setNews] = useState<IArticle[]>([]);
  // console.log('state news', news);

  /******************************/
  const Url: string = 'https://newsapi.org/v2/everything';

  /******************************/
  // ne marche pas avec query ?
  const UrlCountry: string =
    'https://newsapi.org/v2/top-headlines?country=fr&everything';
  /******************************/

  const query: string | null = 'Ps4';

  const API_KEY: string | undefined = process.env.REACT_APP_API_KEY;

  const pagesShow: number = 20;
  const date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substr(0, 10);

  useEffect(() => {
    axios
      .get(
        `${UrlCountry}?q=${query}&from=${date}&sortBy=publishedAt&pageSize=${pagesShow}&apiKey=${API_KEY}`
      )
      .then((res) => {
        console.log('DATA', res.data.articles);
        setNews(res.data.articles);
      });
  }, []);

  const fetchArticles =
    news &&
    news.map((article, i) => {
      return <CardArticle key={i} article={article} />;
    });

  /*********** SEARCH *************/

  //   const search = async (e: React.KeyboardEvent<HTMLInputElement>) => {
  //     if (e.key === 'Enter') {
  //       const res = await fetchNews();
  //       setNews(res);
  //       console.log('api', res);
  //     }
  //   };

  //   const searchNews = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     e.preventDefault();
  //     setNews(e.target.value);
  //   };

  return (
    <>
      <div className='search'>
        {/* <input
          type='text'
          name='search'
          id='searchBar'
          className='search-bar'
          placeholder='Rechercher une ville ...'
          onChange={searchNews}
          onKeyPress={search}
        />
        <label
          htmlFor='searchBar
  '
          className='searchIcon'
        ></label> */}
      </div>
      <div className='flex flex-wrap space-x-4 space-y-4'>{fetchArticles}</div>
    </>
  );
}

export default Home;
