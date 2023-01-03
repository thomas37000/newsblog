import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from '../pages/Home';
import Search from '../components/Search';
import Coins from '../pages/Coins';
import Movies from '../pages/Movies';
// import logo from '../assets/logo192.png';
import logo from '../logo.svg';

const Routter = () => {
  return (
    <BrowserRouter>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <nav>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/movies'>Cinéma</NavLink>
          <NavLink to='/coins'>Cryptomonnaies</NavLink>
          <NavLink to='/meteo'>Méteo</NavLink>
        </nav>
      </header>

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
