import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/board.css'

import Card from './Card.js'

export default class Board extends React.Component {
  renderCards() {
    const cards = this.props.cards.map((card) => {
      return (
        <Card
          key={card.id}
          color={card.color}
          fill={card.fill}
          number={card.number}
          shape={card.shape}
          selected={card.selected}
          onClick={() => this.props.selectCard(card.id)}
        />
      )
    })

    return cards
  }

  render() {
    return (
      <div className={styles.root}>
        {this.renderCards()}
      </div>
    )
  }
}

Board.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      fill: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
      shape: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired,
    })
  ).isRequired,
  selectCard: PropTypes.func.isRequired,
}
