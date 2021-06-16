import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import ContainerApp from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <>
    <Provider store={store}>
      <ContainerApp />
    </Provider>
  </>,
  document.getElementById('root')
);

reportWebVitals();