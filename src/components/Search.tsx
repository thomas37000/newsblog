/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState } from 'react';
import { IWeather } from '../interfaces/WeatherInterface';
import { fetchWeather } from '../api/weatherApi';

const Search: React.FC<IWeather> = () => {
  const [cities, setCities] = useState<string>('');
  const [weather, setWeather] = useState<IWeather | undefined>();

  const search = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const res = await fetchWeather(cities);
      setWeather(res);
      setCities('');
      console.log('api', res);
    }
  };

  const searchCities = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCities(e.target.value);
  };

  const regexCity = weather && weather.name.replace('Arrondissement de', '');

  return (
    <>
      <div className='mt-4'>
        <div className='mb-4'>
          <label
            className='block mb-2 text-sm font-bold text-gray-700'
            htmlFor='météo'
          >
            <span className='text-4xl font-extrabold tracking-tight text-blue-400'>
              Météo
            </span>
          </label>

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
          <div className='grid items-center justify-center p-4 mb-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700'>
            <h5 className='text-4xl font-bold leading-none text-gray-900 dark:text-white'>
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
              {/* <li className='flex space-x-3'>{weather.weather.main}</li> */}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Search;
