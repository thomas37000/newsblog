import { IMovie } from '../../interfaces/MovieInterface';
import { ImgMovieApi } from '../../api/imgMovieApi';
import StarRating from 'react-star-ratings';

const CardMovie = (props: { movie: IMovie }) => {
  const { movie } = props;

  const [year, month, day] = movie.release_date.split('-');
  const dateFr = `${day}-${month}-${year}`;

  return (
    <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700'>
      <img src={ImgMovieApi + movie.backdrop_path} alt={movie.title} />

      <div className='px-6 py-4'>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {movie.title}
        </h5>

        <div className='my-2'>
          note des spectateurs :
          <div className='flex items-center justify-center my-2'>
            <StarRating
              totalStars={5}
              rating={movie.vote_average ? movie.vote_average / 2 : 0}
              starRatedColor='yellow'
              starDimension='18px'
              starSpacing='3px'
            />
            <span className='ml-2'>{movie.vote_average}</span>{' '}
          </div>
        </div>

        <h5 className='mb-2 text-xl font-bold tracking-tight text-yellow-500 dark:text-white'>
          Synopsis
        </h5>
        <p className='text-base text-gray-700'>{movie.overview}</p>
        <div className='mt-4'> <span className='font-bold text-gray-600'>date de sortie :</span> {dateFr}</div>
      </div>
    </div>
  );
};

export default CardMovie;
