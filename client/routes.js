import React from 'react';
import { Route } from 'react-router-dom';
import App from './components/App.js';
import Home from './components/Home.js';
import Game from './components/Game.js';

export default (
  <App>
    <Route exact path="/" component={Home}/>
    <Route path="/:game_id" component={Game}/>
  </App>
);
