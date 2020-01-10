import React from 'react';
import ApiService from '../../apiService/apiService';
import Gallery from '../Gallery';
import Footer from '../Footer';
import 'normalize.css';
import './App.css';

function App() {
  const testApi = new ApiService();
  const json = testApi.getAllPreviews().then(res => console.log(res));
  // const json3 = testApi.getImageAndComments('237').then(res => console.log(res));
  // const post = testApi
  //   .postComment('great pic', '237', 237)
  //   .then(res => console.log(res))
  //   .catch(e => console.error('Error', e));
  // const json4 = testApi.getImageAndComments('237').then(res => console.log(res));
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
