import React from 'react';
import { Link } from 'react-router-dom';
import styles from './game.css';

import Board from './board.js';

const io = require('socket.io-client');
const socket = io();

export default class Game extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <Board/>
      </div>
    );
  }
}
