import { Link } from 'react-router-dom';
import './Nav.css';
import logo from '../logo.svg';

const Nav = () => {
  return (
    <>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />

        <nav>
          <div className='nav-links'>
            <Link to='/' className='name-link'>
              Home
            </Link>
          </div>

          <div className='nav-links'>
            <Link to='/movies' className='name-link'>
              Cinéma
            </Link>
          </div>

          <div className='nav-links'>
            <Link to='/coins' className='name-link'>
              Cryptomonnaies
            </Link>
          </div>

          <div className='nav-links'>
            <Link to='/meteo' className='name-link'>
              Météo
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Nav;
