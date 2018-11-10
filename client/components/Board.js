import React from 'react';
import styles from '../styles/board.css';

import Card from './Card.js';
import { Color, Fill, Shape } from '../model/constants.js';
import _ from 'lodash';

const NUMBER_OF_CARDS = 12;

export default class Board extends React.Component {
  genCard() {
    return {
      color: _.sample(Color),
      fill: _.sample(Fill),
      number: Math.ceil(Math.random() * 3),
      shape: _.sample(Shape),
    };
  }

  renderCards() {
    let cards = []

    for (let i = 0; i < NUMBER_OF_CARDS; i++) {
      let card = this.genCard();

      cards.push(
        <Card
          color={card.color}
          fill={card.fill}
          number={card.number}
          shape={card.shape}
        />
      );
    }

    return cards;
  }

  render() {
    return (
      <div className={styles.root}>
        {this.renderCards()}
      </div>
    );
  }
}
