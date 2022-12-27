import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Search from './components/Search';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
      </header>
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

      <Home />
    </div>
  );
}

export default App;
