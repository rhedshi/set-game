import React from 'react';
import { Link } from 'react-router-dom';
import styles from './home.css';

export default class Home extends React.Component {
  genCode() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let code = '';
    for (let i = 0; i < 4; i++) {
      code += alphabet[Math.floor(Math.random() * 26)];
    }

    return code;
  }

  render() {
    let game_id = this.genCode();

    return (
      <div className={styles.root}>
        <Link to={game_id}>New Game</Link>
      </div>
    );
  }
}
