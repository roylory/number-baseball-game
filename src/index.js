import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppReducer from './reducers';
import App from './components/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={createStore(AppReducer)}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
