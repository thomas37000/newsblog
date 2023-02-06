/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState } from 'react';
import { IWeather } from '../interfaces/WeatherInterface';
import { fetchWeather } from '../api/weatherApi';
import '../App.css';

const Search: React.FC<IWeather> = () => {
  const [cities, setCities] = useState<string>('');
  const [weather, setWeather] = useState<IWeather | undefined>();

  const search = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const res = await fetchWeather(cities);
      setWeather(res);
      setCities('');
      //  console.log('api', res);
    }
  };

  const searchCities = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCities(e.target.value);
  };

  const regexCity = weather && weather.name.replace('Arrondissement de', '');

  return (
    <>
      <div className='mt-4 meteo'>
        <div className='mb-4'>
          <div className='mb-4'>
            Entrer le nom de votre ville puis tapez Entrée pour voir le résultat
          </div>

          <h2 className='mt-0 mb-2 text-5xl font-normal leading-normal text-white'>
            Météo
          </h2>

          <input
            type='text'
            name='search'
            id='searchBar'
            placeholder='Nantes'
            value={cities}
            onChange={searchCities}
            onKeyPress={search}
            className='px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          />
        </div>
      </div>

      {weather && weather.main && (
        <>
          <div className='grid items-center p-4 mb-4'>
            <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700'>
              <div className='px-6 py-4'>
                <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                  {regexCity}
                </h5>

                <div className='items-baseline mt-4 text-gray-900 dark:text-white'>
                  <span className='text-5xl font-extrabold tracking-tight'>
                    {Math.round(weather.main.temp!)}
                  </span>
                  <span className='ml-1 text-xl font-normal text-gray-500 dark:text-gray-400'>
                    <sup>&deg;C</sup>
                  </span>
                </div>

                <ul role='list' className='space-y-5 my-7'>
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
    </>
  );
};

export default Search;
