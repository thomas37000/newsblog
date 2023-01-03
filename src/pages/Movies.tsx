import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IMovie from '../interfaces/MovieInterface';
import CardMovie from '../components/CardMovie';

const Movies: React.FunctionComponent = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const urlMovieDbApi: string = 'https://api.themoviedb.org/3/discover/movie';
  const API_MOVIE_KEY: string | undefined = process.env.REACT_APP_API_MOVIE_KEY;
  const language: string = 'en-US';
  const popularity: string = 'popularity.desc';
  const pagesShow: number = 1;
  const monetisation: string = 'flatrate';

  useEffect(() => {
    const loadCoins = () => {
      setLoading(true);
      axios
        .get(
          `${urlMovieDbApi}?api_key=${API_MOVIE_KEY}&language=${language}&sort_by=${popularity}&include_adult=false&include_video=false&page=${pagesShow}&with_watch_monetization_types=${monetisation}`
        )
        .then((res) => {
          setError('');
          setMovies(res.data.results);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    };

    loadCoins();
  }, []);

  const fetchMovies =
    movies &&
    movies.map((movie, i) => {
      return <CardMovie key={i} movie={movie} />;
    });

  return (
    <>
      <h2 className='mt-0 mb-2 text-5xl font-normal leading-normal text-sky-800'>
        Les Films du moment
      </h2>
      <div className='flex flex-wrap space-x-4 space-y-4'>{fetchMovies}</div>
    </>
  );
};

export default Movies;
