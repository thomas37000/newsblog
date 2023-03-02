import { Link } from 'react-router-dom';
import './Nav.css';
import logo from '../assets/logo.png';

const Nav = () => {
  return (
    <>
      <header className='App-header text-gray-500 '>
        <Link to='/' className='name-link flex items-center justify-center'>
          <img src={logo} className='App-logo' alt='logo' />
          <span className='ml-4'>News Blog</span>
        </Link>
   
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
