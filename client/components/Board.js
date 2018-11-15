import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/board.css'

import Card from './Card.js'
import { isValidSet } from '../model/helpers.js'
import _ from 'lodash'

export default class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      found: false,
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const cards = this.selectedCards()
    if (cards.length === 3 && isValidSet(..._.map(cards, 'id'))) {
      if (!this.state.found) {
        this.setState({ found: true })
      }
    }
    else {
      if (this.state.found) {
        this.setState({ found: false })
      }
    }
  }

  selectedCards() {
    return this.props.cards.filter((card) => card.selected)
  }

  onCardClicked(card, index) {
    if (this.selectedCards().length < 3 || this.props.cards[index].selected) {
      this.props.selectCard(card.id)
    }
  }

  renderCards() {
    const cards = this.props.cards.map((card, index) => {
      return (
        <Card
          key={card.id}
          color={card.color}
          fill={card.fill}
          number={card.number}
          shape={card.shape}
          selected={card.selected}
          success={card.selected && this.state.found}
          failure={
            card.selected &&
            this.selectedCards().length === 3 &&
            !this.state.found
          }
          onClick={() => this.onCardClicked(card, index)}
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
