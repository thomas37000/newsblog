import { IMovie } from '../interfaces/MovieInterface';
import { ImgMovieApi } from '../api/imgMovieApi';

const CardMovie = (props: { movie: IMovie }) => {
  const { movie } = props;

  return (
    <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700'>
      <img src={ImgMovieApi + movie.backdrop_path} alt={movie.title} />

      <div className='p-5'>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {movie.title}
        </h5>

        <div className='mb-2'>{movie.vote_average}</div>
      </div>
    </div>
  );
};

export default CardMovie;
