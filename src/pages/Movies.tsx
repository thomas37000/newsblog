import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IMovie } from '../interfaces/MovieInterface';
import CardMovie from '../components/Cards/CardMovie';
import networkError from '../assets/network-error.jpg';
import FilterMoviesByGenre from '../components/FilterMovies';

const Movies: React.FunctionComponent = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [filtered, setFiltered] = useState<IMovie[]>([]);
  const [activeGenre, setActiveGenre] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // const urlMovieDbApi: string = 'https://api.themoviedb.org/3/discover/movie';
  const urlMovieDbApi: string = 'https://api.themoviedb.org/3/movie/popular';
  const API_MOVIE_KEY: string | undefined = process.env.REACT_APP_API_MOVIE_KEY;
  const language: string = 'en-US';
  const popularity: string = 'popularity.desc';
  const pagesShow: number = 1;
  const monetisation: string = 'flatrate';

  useEffect(() => {
    const controller = new AbortController();

    const loadMovies = () => {
      setLoading(true);
      axios
        .get(
          `${urlMovieDbApi}?api_key=${API_MOVIE_KEY}&language=${language}&sort_by=${popularity}&include_adult=false&include_video=false&page=${pagesShow}&with_watch_monetization_types=${monetisation}`,
          { signal: controller.signal }
        )
        .then((res) => {
          setError('');
          setMovies(res.data.results);
          setFiltered(res.data.results);
          // console.log('genre_ids', res.data.results[0].genre_ids);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));

      return () => {
        controller.abort();
      };
    };

    loadMovies();
  }, []);

  const fetchMovies =
    filtered &&
    filtered.map((movie, i) => {
      return <CardMovie key={i} movie={movie} />;
    });

  // const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setGenre(+e.target.value);
  //   console.log(+e.target.value);
  // };

  if (loading) return <p>"Loading ..."</p>;
  if (error !== '')
    return (
      <p>
        {error}
        <img className='rounded-t-lg' src={networkError} alt='Networ error' />
      </p>
    );
  if (!movies) return <p>"Problème avec l' Api..."</p>;

  return (
    <div className='movies'>
      <h2 className='mt-0 mb-2 text-5xl font-normal leading-normal text-sky-800'>
        Les Films du moment
      </h2>

      {/* <div>
        <div className='flex items-center mb-4'>
          <input
            id='default-radio-1'
            type='radio'
            name='genre'
            value='Action'
            // checked={genre === 28}
            // onChange={handleGenreChange}
            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
          />
          <label
            htmlFor='default-radio-1'
            className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Action
          </label>
        </div>

        <div className='flex items-center'>
          <input
            id='default-radio-2'
            type='radio'
            name='genre'
            value='Horror'
            // checked={genre === 27}
            // onChange={handleGenreChange}
            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
          />
          <label
            htmlFor='default-radio-2'
            className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Horreur
          </label>
        </div>
      </div> */}

      <FilterMoviesByGenre
        movies={movies}
        setFiltered={setFiltered}
        activeGenre={activeGenre}
        setActiveGenre={setActiveGenre}
      />

      <div className='flex flex-wrap space-x-4 space-y-4'>{fetchMovies}</div>
    </div>
  );
};

export default Movies;
