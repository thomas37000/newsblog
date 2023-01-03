import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IArticle from '../interfaces/ArticleInterface';
import IMovie from '../interfaces/MovieInterface';
import IFavorite from '../interfaces/FavoriteInterface';
import { fetchNews } from '../api/api';
import CardArticle from '../components/CardArticle';
import networkError from '../assets/network-error.jpg';
import CardMovie from '../components/CardMovie';

const Home: React.FunctionComponent = () => {
  const [news, setNews] = useState<IArticle[] | null>(null);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [articles, setArticles] = useState<string>('');
  const [newsShow, setNewsShow] = useState<number>(50);
  const [error, setError] = useState<string>('');
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
  }, []);

  const fetchMovies =
    movies &&
    movies.slice(0, 1).map((movie, i) => {
      return <CardMovie key={i} movie={movie} />;
    });

  /*********** SEARCH *************/

  const search = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const res = await fetchNews(articles);
      setArticles(res);
      console.log('articles Api', res);
    }
  };

  const searchArticles = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setArticles(e.target.value);
  };

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
  const updateNews = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewsShow(+event.target.value);
  };

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
      <div className='flex flex-wrap space-x-4 space-y-4'>{fetchMovies}</div>
      {/* NEWS */}
      <div className='mt-4'>
        <div className='mb-4'>
          <label
            className='block mb-2 text-sm font-bold text-gray-700'
            htmlFor='météo'
          >
            <span className='text-4xl font-extrabold tracking-tight text-sky-800'>
              Articles
            </span>
          </label>

          <input
            type='text'
            name='search'
            id='searchBar'
            placeholder='Nicolas Tesla'
            value={articles}
            onChange={searchArticles}
            onKeyPress={search}
            className='px-3 py-2 mb-4 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          />

          <label
            htmlFor='filter the news'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Changer le nombre de news {newsShow}
          </label>

          <input
            id='small-range'
            type='range'
            min={1}
            max={100}
            value={newsShow}
            onChange={updateNews}
            className='h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer w-96 range-sm dark:bg-gray-700'
          />
        </div>
      </div>
      <div className='flex flex-wrap space-x-4 space-y-4'>{fetchArticles}</div>
    </>
  );
};

export default Home;
