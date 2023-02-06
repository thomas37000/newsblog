import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IArticle from '../interfaces/ArticleInterface';
import CardArticle from '../components/Cards/CardArticle';
import notAllowed from '../assets/not allowed.png';
import apiNewsPreview from '../assets/apinews apperçu.png';

const News: React.FunctionComponent = () => {
  const [news, setNews] = useState<IArticle[] | null>(null);
  const [newsShow] = useState<number | any>(50);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const Url: string = 'https://newsapi.org/v2/top-headlines';
  const API_KEY: string | undefined = process.env.REACT_APP_API_NEWS_KEY;
  const date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substr(0, 10);

  useEffect(() => {
    const loadData = () => {
      setLoading(true);
      axios
        .get(`${Url}?country=fr&category=entertainment&apiKey=${API_KEY}`)
        .then((res) => {
          setError('');
          // console.log('DATA', res.data.articles);
          // console.log('catégories', res.data.sources);
          setNews(res.data.articles);
          //setNews(res.data.sources);
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
  //     const res = await fetchNews(articles);
  //     setArticles(res);
  //     console.log('articles Api', res);
  //   }
  // };

  // const searchArticles = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   setArticles(e.target.value);
  // };

  /*********** Input Range *************/
  // const updateNews = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   setNewsShow(e.target.value);
  // };

  if (loading) return <p>"Loading ..."</p>;
  // apinews gratuit en localhost payant si build
  if (error !== '')
    return (
      <div>
        Impossible d'afficher les articles de https://newsapi.org/ en mode
        gratuit seulement en localhost
        
        <img
          className='mt-2 rounded-t-lg'
          src={notAllowed}
          alt='unable to deploy the API on the free pricing plan as apinews.org is not permitted for builds in the testing and development phase'
        />
        <img
          className='rounded-t-lg'
          src={apiNewsPreview}
          alt='Preview of what it looks like on localhost'
        />
        
      </div>
    );
  if (!news) return <p>"Problème avec l' Api..."</p>;

  return (
    <>
      <h2 className='mt-0 mb-2 text-5xl font-normal leading-normal text-sky-800'>
        l' Actualité en direct
      </h2>

      <div className='flex flex-wrap space-x-4 space-y-4'>{fetchArticles}</div>
    </>
  );
};

export default News;
