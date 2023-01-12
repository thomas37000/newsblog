import { useEffect } from 'react';

const FilterMoviesByGenre = (props: {
  activeGenre: any;
  setActiveGenre: any;
  setFiltered: any;
  movies: any;
}) => {
  const { activeGenre, setActiveGenre, setFiltered, movies } = props;

  useEffect(() => {
    // all movies by default
    if (activeGenre === 0) {
      setFiltered(movies);
      return;
    }

    // filter movie by genre_ids
    const filtered = movies.filter((movie: any) =>
      movie.genre_ids.includes(activeGenre)
    );

    setFiltered(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeGenre]);

  return (
    <>
      <button
        onClick={() => setActiveGenre(0)}
        className='px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent'
      >
        All
      </button>
      <button
        onClick={() => setActiveGenre(28)}
        className='px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent'
      >
        Action
      </button>
      <button
        onClick={() => setActiveGenre(27)}
        className='px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent'
      >
        Horreur
      </button>
      <button
        onClick={() => setActiveGenre(35)}
        className='px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent'
      >
        Comédie
      </button>
    </>
  );
};

export default FilterMoviesByGenre;
