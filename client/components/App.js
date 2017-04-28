import React from 'react';
import styles from './app.css';

import Board from './board.js';

export default class App extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <Board/>
      </div>
    );
  }
}
