import { BrowserRouter, Routes, Route } from 'react-router-dom';
import News from '../pages/News';
import Meteo from '../pages/Meteo';
import Movies from '../pages/Movies';
import Nav from '../components/Nav';
import CoinsGecko from '../pages/CoinsGecko';
import CoinDetail from '../pages/CoinDetail';
import Home from '../pages/Home';

const Routter = () => {
  return (
    <BrowserRouter>
      <Nav />
      <main>
        <Routes>
        <Route index element={<Home />} />
          <Route path='movies' element={<Movies />} />
          <Route path='coins' element={<CoinsGecko />} />
          <Route path='coin/:id' element={<CoinDetail />} />
          <Route
            path='meteo'
            element={
              <Meteo
                main={undefined!}
                weather={undefined!}
                id={0}
                name={''}
                rain={undefined!}
                sys={undefined!}
                wind={undefined!}
                cod={undefined!}
                icon={undefined!}
              />
            }
          />
          <Route path='news' element={<News />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default Routter;
