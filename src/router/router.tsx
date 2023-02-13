import { BrowserRouter, Routes, Route } from 'react-router-dom';
import News from '../pages/News';
import Search from '../components/Search';
import Movies from '../pages/Movies';
import Nav from '../components/Nav';
import CoinsGecko from '../pages/CoinsGecko';
import ChartJs from '../pages/Chart';

const Routter = () => {
  return (
    <BrowserRouter>
      <Nav />
      <main>
        <Routes>
          <Route index element={<Movies />} />
          <Route path='coins' element={<CoinsGecko />} />
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
          <Route path='news' element={<News />} />
          <Route path='chart' element={<ChartJs />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default Routter;
