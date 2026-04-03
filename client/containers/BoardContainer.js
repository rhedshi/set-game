import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Board from '../components/Board.js'
import {
  selectCard,
  replaceCards,
  deselectCards,
} from '../actions/index.js'

const mapStateToProps = (state) => ({
  cards: state.board.cards,
})

const mapDispatchToProps = (dispatch) => ({
  selectCard: bindActionCreators(selectCard, dispatch),
  replaceCards: bindActionCreators(replaceCards, dispatch),
  deselectCards: bindActionCreators(deselectCards, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Board)
