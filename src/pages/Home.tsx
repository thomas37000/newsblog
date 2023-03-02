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

  return (
    <>
      {/* COINS */}
      <section className='py-6'>
        <div className='flex justify-center'>
          <HomeCoinList coins={coins} />
        </div>
      </section>

      {/* CINEMA */}
      <section className='py-6'>
        <div className='text-xl font-bold leading-none text-gray-900 dark:text-white'>
          Envie d'aller voir un film voici les 3 meilleurs films récents les
          mieux notés par les internautes.
          <p>
            Sinon allez voir les autres films sur la page{' '}
            <Link to='/movies' className='text-red-600'>
              Cinéma
            </Link>
          </p>
        </div>

        <div className='flex justify-center mt-8 space-x-4'>{fetchMovies}</div>
      </section>
    </>
  );
};

export default Home;
