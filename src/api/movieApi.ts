import axios from 'axios';

const urlMovieDbApi: string = 'https://api.themoviedb.org/3/discover/movie';
const API_MOVIE_KEY: string | undefined = process.env.REACT_APP_API_MOVIE_KEY;
const language: string = 'en-US';
const popularity: string = 'popularity.desc';
const pagesShow: number = 1;
const monetisation: string = 'flatrate';

export const fetchMovies = async (query: string) => {
  const { data } = await axios.get(urlMovieDbApi, {
    params: {
      q: query,
      language: language,
      sort_by: popularity,
      include_adult: false,
      include_video: false,
      page: pagesShow,
      with_watch_monetization_types: monetisation,
      apikey: API_MOVIE_KEY,
    },
  });

  return data;
};
