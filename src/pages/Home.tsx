import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IArticle from '../interfaces/ArticleInterface';
import { IMovie } from '../interfaces/MovieInterface';
import CardArticle from '../components/Cards/CardArticle';
import { fetchNews } from '../api/api';
import networkError from '../assets/placeholder.png';
import CardMovie from '../components/Cards/CardMovie';

const Home: React.FunctionComponent = () => {
  const [news, setNews] = useState<IArticle[] | null>(null);
  // const [news, setNews] = useState<IArticleCategory[] | null>(null);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [articles, setArticles] = useState<string>('');
  const [newsShow, setNewsShow] = useState<number | any>(50);
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

  const urlMovieDbApi: string = 'https://api.themoviedb.org/3/discover/movie';
  const API_MOVIE_KEY: string | undefined = process.env.REACT_APP_API_MOVIE_KEY;
  const language: string = 'en-US';
  const popularity: string = 'popularity.desc';
  const pagesShow: number = 1;
  const monetisation: string = 'flatrate';

  useEffect(() => {
    fetch(
      `${urlMovieDbApi}?api_key=${API_MOVIE_KEY}&language=${language}&sort_by=${popularity}&include_adult=false&include_video=false&page=${pagesShow}&with_watch_monetization_types=${monetisation}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, [API_MOVIE_KEY]);

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
  if (error !== '')
    return (
      <p>
        {error}
        <img className='rounded-t-lg' src={networkError} alt='Networ error' />
      </p>
    );
  if (!news) return <p>"Problème avec l' Api..."</p>;

  return (
    <>
      {/* COINS */}

      {/* CINEMA */}

      {/* NEWS */}
      <h2 className='mt-0 mb-2 text-5xl font-normal leading-normal text-sky-800'>
        l' Actualité en direct
      </h2>

      <div className='flex flex-wrap space-x-4 space-y-4'>{fetchArticles}</div>
    </>
  );
};

export default Home;
