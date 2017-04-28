import React from 'react';
import { Link } from 'react-router-dom';
import styles from './home.css';

export default class Home extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <Link to="/game">New Game</Link>
      </div>
    );
  }
}
