import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
      </header>
      <Home />
    </div>
  );
}

export default App;
