import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/card.css'

import classNames from 'classnames'
import Symbol from './Symbol.js'

export default class Card extends React.Component {
  renderSymbols() {
    let symbols = []

    for (let i = 0; i < this.props.number; i++) {
      symbols.push(
        <Symbol
          color={this.props.color}
          fill={this.props.fill}
          shape={this.props.shape}
        />
      )
    }

    return symbols
  }

  render() {
    return (
      <div
        className={classNames({
          [styles.root]: true,
          [styles.selected]: this.props.selected,
          [styles.success]: this.props.success,
          [styles.failure]: this.props.failure,
        })}
        onClick={this.props.onClick}
      >
        {this.renderSymbols()}
      </div>
    )
  }
}

Card.defaultProps = {
  selected: false,
  success: false,
  failure: false,
}

Card.propTypes = {
  color: PropTypes.string.isRequired,
  fill: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  shape: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  success: PropTypes.bool,
  failure: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}
