import { Link } from 'react-router-dom';
import './Nav.css';
import logo from '../logo.svg';

const Nav = () => {
  return (
    <>
      <header className='App-header'>
        <Link to='/' className='name-link'>
          <img src={logo} className='App-logo' alt='logo' />
        </Link>

        <nav>
          <div className='nav-links'>
            <Link to='/' className='name-link'>
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

          <div className='nav-links'>
            <Link to='/news' className='name-link'>
              News
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Nav;
