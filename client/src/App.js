import './App.css';
import MainForm from './components/MainForm';
import { useState, useEffect } from 'react';
import Test from './components/Test';

import axios from 'axios';

function App() {

  const [data, setData] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5100/')
      .then(function (response) {
        setData(response.data);
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])


  return (
    <div className="App">
      <div className='App-header-wrapper'>
        <h1 className='App-header'>URL Shortner App</h1>
      </div>
      {/* <div className='form-wrapper'>
        <MainForm slug={data} />
      </div> */}

      <Test/>

    </div>
  );
}

export default App;
