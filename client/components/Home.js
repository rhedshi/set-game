import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/home.css';

import Game from './Game.js';

export default class Home extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <Game/>
      </div>
    );
  }
}
