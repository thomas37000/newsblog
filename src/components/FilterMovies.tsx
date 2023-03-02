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
    <div className='w-8/12'>
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
      <button
        onClick={() => setActiveGenre(12)}
        className='px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent'
      >
        Aventure
      </button>
      <button
        onClick={() => setActiveGenre(16)}
        className='px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent'
      >
        Animation
      </button>
      <button
        onClick={() => setActiveGenre(80)}
        className='px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent'
      >
        Crime
      </button>
      <button
        onClick={() => setActiveGenre(99)}
        className='px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent'
      >
        Documentaire
      </button>
      <button
        onClick={() => setActiveGenre(18)}
        className='px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent'
      >
        Drame
      </button>
      <button
        onClick={() => setActiveGenre(10751)}
        className='px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent'
      >
        Famille
      </button>
      <button
        onClick={() => setActiveGenre(14)}
        className='px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent'
      >
        Fantastique
      </button>
      <button
        onClick={() => setActiveGenre(10749)}
        className='px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent'
      >
        Romantique
      </button>
      <button
        onClick={() => setActiveGenre(878)}
        className='px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent'
      >
        Science Fiction
      </button>
      <button
        onClick={() => setActiveGenre(53)}
        className='px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent'
      >
        Thriller
      </button>
      <button
        onClick={() => setActiveGenre(10752)}
        className='px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent'
      >
        Guerre
      </button>
      <button
        onClick={() => setActiveGenre(37)}
        className='px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent'
      >
        Western
      </button>
      <button
        onClick={() => setActiveGenre(36)}
        className='px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent'
      >
        Histoire
      </button>
      <button
        onClick={() => setActiveGenre(9648)}
        className='px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent'
      >
        Mystère
      </button>
      <button
        onClick={() => setActiveGenre(10402)}
        className='px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent'
      >
        Musique
      </button>
      <button
        onClick={() => setActiveGenre(10770)}
        className='px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent'
      >
        Film Télé
      </button>
    </div>
  );
};

export default FilterMoviesByGenre;
