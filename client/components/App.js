import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/app.css'

export default class App extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node,
}
