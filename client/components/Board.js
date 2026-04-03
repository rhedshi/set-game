import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/board.css'

import Card from './Card.js'
import { isValidSet } from '../model/helpers.js'
import _ from 'lodash'

/** Must match `.selected.failure` animation duration in `card.css` */
const FAILURE_ANIMATION_MS = 750

/** Must match `.selected.success` animation duration in `card.css` */
const SUCCESS_ANIMATION_MS = 750

export default class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      found: false,
    }
    this.failureDeselectTimeout = null
    this.failureDeselectKey = null
    this.successReplaceTimeout = null
    this.successReplaceKey = null
  }

  componentWillUnmount() {
    this.clearFailureDeselectTimer()
    this.clearSuccessReplaceTimer()
  }

  clearFailureDeselectTimer() {
    if (this.failureDeselectTimeout) {
      clearTimeout(this.failureDeselectTimeout)
      this.failureDeselectTimeout = null
    }
    this.failureDeselectKey = null
  }

  clearSuccessReplaceTimer() {
    if (this.successReplaceTimeout) {
      clearTimeout(this.successReplaceTimeout)
      this.successReplaceTimeout = null
    }
    this.successReplaceKey = null
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

  scheduleSuccessReplace(ids) {
    const key = ids.slice().sort((a, b) => a - b).join('-')
    if (this.successReplaceKey === key && this.successReplaceTimeout) {
      return
    }
    this.clearSuccessReplaceTimer()
    this.successReplaceKey = key
    if (!this.state.found) {
      this.setState({ found: true })
    }
    this.successReplaceTimeout = setTimeout(() => {
      this.successReplaceTimeout = null
      this.successReplaceKey = null
      this.props.replaceCards(ids)
    }, SUCCESS_ANIMATION_MS)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const cards = this.selectedCards()
    if (cards.length === 3) {
      if (isValidSet(..._.map(cards, 'id'))) {
        this.clearFailureDeselectTimer()
        this.scheduleSuccessReplace(_.map(cards, 'id'))
      }
      else {
        this.clearSuccessReplaceTimer()
        this.scheduleFailureDeselect(_.map(cards, 'id'))
      }
    }
    else {
      this.clearFailureDeselectTimer()
      this.clearSuccessReplaceTimer()
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
    return this.props.cards.map((card, index) => {
      return (
        <div key={card.id}>
          <Card
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
      )
    })
  }

  render() {
    return <div className={styles.root}>{this.renderCards()}</div>
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
