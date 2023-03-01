import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { IMovie } from '../interfaces/MovieInterface';

import ICoinGecko from '../interfaces/Coins/GeckoApi/CoinsInterfaceGecko';
import HomeCardMovie from '../components/Cards/HomeCards/HomeCardMovie';
import HomeCoinList from '../components/Cards/HomeCards/HomeCoinList';

const Home: React.FunctionComponent = () => {
  const [coins, setCoins] = useState<ICoinGecko[]>([]);
  const [movies, setMovies] = useState<IMovie[]>([]);
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
        return <HomeCardMovie key={i} movie={movie} />;
      });

  const urlCoinApi: string =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&page=1&sparkline=false';

  useEffect(() => {
    const loadCoins = () => {
      setLoading(true);

      axios
        .get(urlCoinApi)
        .then((res) => {
          setError('');
          setCoins(res.data);
          console.log(res.data);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    };

    loadCoins();
  }, []);

  const randomCoins = coins.sort(() => Math.random() - 0.5).slice(0, 3);

  return (
    <>
      {/* COINS */}
      <div>
        <HomeCoinList coins={coins} />
      </div>

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

      <div className='flex items-stretch'>{fetchMovies}</div>
    </>
  );
};

export default Home;
