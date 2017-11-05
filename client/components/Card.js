import React from 'react';
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
  color: React.PropTypes.string.isRequired,
  fill: React.PropTypes.string.isRequired,
  number: React.PropTypes.number.isRequired,
  shape: React.PropTypes.string.isRequired,
}
