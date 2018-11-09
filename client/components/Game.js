import React from 'react';
import { Link } from 'react-router-dom';
import styles from './game.css';

import Board from './board.js';

const io = require('socket.io-client');
const socket = io();

export default class Game extends React.Component {
  renderTitle() {
    return (
      <div className={styles.title}>
        <img src={require('../assets/set-game-title.svg')}/>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.root}>
        {this.renderTitle()}
        <span></span>
        <Board/>
        <span></span>
      </div>
    );
  }
}
