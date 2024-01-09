// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import UserRegistrationForm from './components/UserRegistrationForm';

ReactDOM.render(
  <Provider store={store}>
    <UserRegistrationForm />
  </Provider>,
  document.getElementById('root')
);
