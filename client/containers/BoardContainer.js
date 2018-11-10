import { connect } from 'react-redux';

import Board from '../components/Board.js';
import { getCardFromID } from '../model/helpers.js';
import _ from 'lodash';

const mapStateToProps = state => ({
  cards: state.board.map(getCardFromID),
})

export default connect(
  mapStateToProps,
)(Board)
