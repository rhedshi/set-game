import React from 'react'
import styles from '../styles/game.css'

import BoardContainer from '../containers/BoardContainer.js'

export default class Game extends React.Component {
  renderTitle() {
    return (
      <div className={styles.title}>
        <img src={require('../assets/set-game-title.svg')}/>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.root}>
        {this.renderTitle()}
        <span></span>
        <BoardContainer/>
        <span></span>
      </div>
    )
  }
}
