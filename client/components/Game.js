import React from 'react';
import { Link } from 'react-router-dom';
import styles from './game.css';

import Board from './board.js';

const io = require('socket.io-client');
const socket = io();

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.game = props.match.params.game_id;
  }

  componentDidMount() {
    socket.emit('game', {game: this.game, enter: true});
  }

  componentWillUnmount() {
    socket.emit('game', {game: this.game, enter: false});
  }

  render() {
    return (
      <div className={styles.root}>
        <Link to="/">Home</Link>
        <Board/>
      </div>
    );
  }
}
