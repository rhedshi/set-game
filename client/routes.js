import React from 'react';
import { Route } from 'react-router-dom';
import App from './components/App.js';
import Home from './components/Home.js';

export default (
  <App>
    <Route exact path="/" component={Home}/>
  </App>
);
