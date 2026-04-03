import React from 'react'
import PropTypes from 'prop-types'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group'
import styles from '../styles/board.css'

import Card from './Card.js'
import { isValidSet } from '../model/helpers.js'
import _ from 'lodash'

/** Must match `.selected.failure` animation duration in `card.css` */
const FAILURE_ANIMATION_MS = 750

const CardTransition = (props) => {
  return (
    <CSSTransition
      {...props}
      classNames={{ enter: styles.enter }}
      timeout={750}
    />
  )
}

export default class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      found: false,
    }
    this.failureDeselectTimeout = null
    this.failureDeselectKey = null
  }

  componentWillUnmount() {
    this.clearFailureDeselectTimer()
  }

  clearFailureDeselectTimer() {
    if (this.failureDeselectTimeout) {
      clearTimeout(this.failureDeselectTimeout)
      this.failureDeselectTimeout = null
    }
    this.failureDeselectKey = null
  }

  scheduleFailureDeselect(ids) {
    const key = ids.slice().sort((a, b) => a - b).join('-')
    if (this.failureDeselectKey === key && this.failureDeselectTimeout) {
      return
    }
    this.clearFailureDeselectTimer()
    this.failureDeselectKey = key
    this.failureDeselectTimeout = setTimeout(() => {
      this.failureDeselectTimeout = null
      this.failureDeselectKey = null
      this.props.deselectCards(ids)
    }, FAILURE_ANIMATION_MS)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const cards = this.selectedCards()
    if (cards.length === 3) {
      if (isValidSet(..._.map(cards, 'id'))) {
        this.clearFailureDeselectTimer()
        if (!this.state.found) {
          this.setState({ found: true })
        }
        else {
          this.props.replaceCards(_.map(cards, 'id'))
        }
      }
      else {
        this.scheduleFailureDeselect(_.map(cards, 'id'))
      }
    }
    else {
      this.clearFailureDeselectTimer()
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
        <CardTransition key={card.id}>
          <div>
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
          </div>
        </CardTransition>
      )
    })

    return cards
  }

  render() {
    return (
      <TransitionGroup className={styles.root}>
        {this.renderCards()}
      </TransitionGroup>
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
  replaceCards: PropTypes.func.isRequired,
  deselectCards: PropTypes.func.isRequired,
}
