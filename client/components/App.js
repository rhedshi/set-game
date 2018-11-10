import React from 'react';
import styles from '../styles/app.css';

export default class App extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        {this.props.children}
      </div>
    );
  }
}
