import React from 'react';
import { Link } from 'react-router-dom';
import styles from './game.css';

import Board from './board.js';

export default class Game extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <Link to="/">Home</Link>
        <Board/>
      </div>
    );
  }
}
