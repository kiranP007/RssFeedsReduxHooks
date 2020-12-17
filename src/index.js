import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/home/home';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import configureStore from "./store"

const store = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Home />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();