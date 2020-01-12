import React from 'react';
import Gallery from '../Gallery';
import Footer from '../Footer';
import 'normalize.css';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-header__title">TEST APP</h1>
      </header>
      <Gallery />
      <Footer />
    </div>
  );
};

export default App;
