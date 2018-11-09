import React from 'react';
import PropTypes from 'prop-types';
import styles from './card.css';

import Symbol from './symbol.js';

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
      );
    }

    return symbols;
  }

  render() {
    return (
      <div className={styles.root}>
        {this.renderSymbols()}
      </div>
    );
  }
}

Card.defaultProps = {
  number: 1,
}

Card.propTypes = {
  color: PropTypes.string.isRequired,
  fill: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  shape: PropTypes.string.isRequired,
}
