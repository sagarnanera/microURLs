import './styles/App.css';
import { useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import IndexPage from './pages/IndexPage';

import { Provider } from 'react-redux';
import store from './store/store';

function App() {

  const [data, setData] = useState('');

  useEffect(() => {
    axios.get(`http://${process.env.REACT_APP_HOST}`)
      .then(function (response) {
        setData(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])


  return (
    <>
      <Provider store={store}>
        <div className="App">
          <IndexPage />
        </div>
        <ToastContainer style={{ width: "400px" }} />
      </Provider>
    </>
  );
}

export default App;
