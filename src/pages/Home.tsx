import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import IArticle from '../interfaces/ArticleInterface';
import { IMovie } from '../interfaces/MovieInterface';
import IFavorite from '../interfaces/FavoriteInterface';
import { fetchNews } from '../api/api';
import CardArticle, { IArticleCategory } from '../components/Cards/CardArticle';
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

  /******************************/
  const Url: string = 'https://newsapi.org/v2/top-headlines';

  const UrlCountry: string = `${Url}?country=fr&everything`;

  const query: string | null = '';

  const API_KEY: string | undefined = process.env.REACT_APP_API_NEWS_KEY;

  const date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substr(0, 10);

  /*************** TODO ***************/
  // ne marche pas avec query ?
  // const UrlQuerySearch: string = `${Url}?q=skateboard&apiKey=${API_KEY}`;

  /**************** par noms de domaines**************/
  // const UrlWeb: string = https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=${API_KEY}';

  /**************** par sources**************/
  // const UrlSources: string = `${Url}/sources?category=general&apiKey=${API_KEY}`;

  /**************** par catégories **************/
  // const UrlCatgory: string = `${Url}?country=fr&category=entertainment&apiKey=${API_KEY}`;

  /*
   * The category you want to get headlines for.
   * Possible options: business / entertainment / general / health / science / sports / technology.
   * Note: you can't mix this param with the sources param.
   */

  useEffect(() => {
    const loadData = () => {
      setLoading(true);
      axios
        .get(
          // `${UrlCountry}?q=${query}&from=${date}&sortBy=publishedAt&pageSize=${newsShow}&apiKey=${API_KEY}`
          // `${UrlSources}/sources?category=general&apiKey=${API_KEY}`
          `${Url}?country=fr&category=entertainment&apiKey=${API_KEY}`
        )
        .then((res) => {
          setError('');
          console.log('DATA', res.data.articles);
          //  console.log('catégories', res.data.sources);
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
  }, []);

  const fetchMovies =
    movies &&
    movies
      .filter((movie: any) => movie.vote_average >= 7.5)
      .slice(0, 3)
      .map((movie, i) => {
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
  const updateNews = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewsShow(e.target.value);
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
      <div
        className='flex justify-center p-4 my-8 text-sm text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-300'
        role='alert'
      >
        <svg
          aria-hidden='true'
          className='flex-shrink-0 inline w-5 h-5 mr-3'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fill-rule='evenodd'
            d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
            clip-rule='evenodd'
          ></path>
        </svg>
        <span className='sr-only'>Info</span>
        <div>
          <span className='font-medium'></span> Envie d'aller voir un film voici
          les 3 meilleurs films récents les mieux notés par les internautes.{' '}
          <p>
            Sinon allez voir les autres films sur la page{' '}
            <Link to='/movies' className='text-red-600'>
              Cinéma
            </Link>
          </p>
        </div>
      </div>

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
