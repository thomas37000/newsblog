import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IArticle from '../interfaces/ArticleInterface';
import CardArticle from '../components/Cards/CardArticle';
import notAllowed from '../assets/not allowed.png';
import apiNewsPreview from '../assets/preview.png';
import apiNewsPreview2 from '../assets/apinews apperçu.png';

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
        <div
          className='flex items-center px-4 py-3 text-sm font-bold text-white bg-blue-500'
          role='alert'
        >
          <svg
            className='w-4 h-4 mr-2 fill-current'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
          >
            <path d='M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z' />
          </svg>
          <p>
            {' '}
            Impossible d'afficher les articles de https://newsapi.org/ en mode
            gratuit seulement en localhost
          </p>
        </div>

        <img
          className='mt-4 rounded-t-lg'
          src={notAllowed}
          alt='unable to deploy the API on the free pricing plan as newsapi.org is not permitted for builds in the testing and development phase'
        />
        <img
          className='rounded-t-lg'
          src={apiNewsPreview}
          alt='Preview of what it looks like on localhost with newsapi.org'
        />
        <img
          className='rounded-t-lg'
          src={apiNewsPreview2}
          alt='Preview of what it looks like on localhost with newsapi.org'
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
