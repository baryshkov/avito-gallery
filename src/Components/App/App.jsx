import React from 'react';
import ApiService from '../../apiService/apiService';
import Gallery from '../Gallery';
import Footer from '../Footer';
import 'normalize.css';
import './App.css';

function App() {
  const testApi = new ApiService();
  const json = testApi.getAllPreviews().then(res => console.log(res));

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-header__title">TEST APP</h1>
      </header>
      <Gallery />
      <Footer />
    </div>
  );
}

export default App;
