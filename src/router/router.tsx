import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Search from '../components/Search';
import Coins from '../pages/Coins';
import Movies from '../pages/Movies';
import Nav from '../components/Nav';

const Routter = () => {
  return (
    <BrowserRouter>
      <Nav />
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route
            path='meteo'
            element={
              <Search
                main={undefined!}
                weather={undefined!}
                id={0}
                name={''}
                rain={undefined!}
                sys={undefined!}
                wind={undefined!}
                cod={undefined!}
                icon={undefined}
              />
            }
          />

          <Route path='movies' element={<Movies />} />
          <Route path='coins' element={<Coins />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default Routter;
