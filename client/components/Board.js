import React from 'react';
import styles from './board.css';

import Card from './card.js';

const NUMBER_OF_CARDS = 12;

export default class Board extends React.Component {
  render() {
    let cards = []
    for (let i = 0; i < NUMBER_OF_CARDS; i++) {
      cards.push(<Card/>);
    }

    return (
      <div className={styles.root}>
        {cards}
      </div>
    );
  }
}
