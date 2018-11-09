import React from 'react';
import PropTypes from 'prop-types';
import styles from './symbol.css';

import classNames from 'classnames';
import { Color, Fill, Shape } from '../model/constants.js';

export default class Symbol extends React.Component {
  render() {
    return (
      <div
        className={classNames({
          [styles.root]: true,
          [styles.triangle]: this.props.shape === Shape.TRIANGLE,
        })}
      >
        <img src={require(`../assets/images/${this.props.shape}-${this.props.fill}-${this.props.color}.svg`)}/>
      </div>
    );
  }
}

Symbol.propTypes = {
  color: PropTypes.string.isRequired,
  fill: PropTypes.string.isRequired,
  shape: PropTypes.string.isRequired,
}
