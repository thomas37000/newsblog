import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { IMovie } from '../interfaces/MovieInterface';

import ICoinGecko from '../interfaces/Coins/GeckoApi/CoinsInterfaceGecko';
import HomeCardMovie from '../components/Cards/HomeCards/HomeCardMovie';
import HomeCoinList from '../components/Cards/HomeCards/HomeCoinList';
import { IWeather } from '../interfaces/WeatherInterface';
import '../App.css';

const Home: React.FC = () => {
  const [coins, setCoins] = useState<ICoinGecko[]>([]);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [weather, setWeather] = useState<IWeather | undefined>();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  /******************************/
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
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    };

    loadCoins();
  }, []);
  const API_WEATHER_KEY: string | undefined =
    process.env.REACT_APP_API_WEATHER_KEY;
  const cityQuery: string = `https://api.openweathermap.org/data/2.5/weather?q=Nantes&appid=${API_WEATHER_KEY}&units=metric`;

  useEffect(() => {
    const loadWeather = () => {
      setLoading(true);

      axios
        .get(cityQuery)
        .then((res) => {
          setError('');
          setWeather(res.data);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    };

    loadWeather();
  }, [cityQuery]);

  const regexCity = weather && weather.name.replace('Arrondissement de', '');

  if (loading) return <p>"Loading ..."</p>;
  if (error !== '') return <p>"Problème avec les Apis..."</p>;

  return (
    <>
      <div className='flex justify-center items-center space-x-40'>
        {/* COINS */}
        <section className='py-6'>
          <div className='flex justify-center'>
            <HomeCoinList coins={coins} />
          </div>
        </section>

        {/* METEO */}

        <section>
          {weather && weather.main && (
            <>
              <div className='flex items-center justify-center mb-4 p-4t'>
                <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 mr-40'>
                  <div className='px-6 py-4 w-72'>
                    <h5 className='mb-2 text-2xl font-bold tracking-tight text-sky-600 dark:text-white'>
                      {regexCity}
                    </h5>
                    <div className='flex items-center mt-4 text-gray-900 dark:text-white'>
                      <span className='text-5xl font-extrabold tracking-tight'>
                        {Math.round(weather.main.temp!)}
                      </span>
                      <span className='ml-1 text-xl font-normal text-gray-500 dark:text-gray-400'>
                        <sup>&deg;C</sup>
                      </span>
                      {Array.isArray(weather.weather) &&
                        weather.weather.length > 0 && (
                          <img
                            className='h-auto'
                            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt=''
                          />
                        )}
                    </div>
                    <ul className='space-y-5 my-7'>
                      <li className='flex space-x-3'>
                        <span className='text-base text-gray-700'>
                          Ressenti {weather.main.feels_like}
                          <sup>&deg;C</sup>
                        </span>
                      </li>
                      <li className='flex space-x-3'>
                        <span className='text-base text-gray-700'>
                          Rafales {weather.wind.speed} km/h
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      </div>

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
