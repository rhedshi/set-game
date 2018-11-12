import { ActionType } from '../actions/constants.js'
import { genRandomBoard, getCardFromID } from '../model/helpers.js'

const getInitialState = () => {
  const ids = genRandomBoard()

  let cards = []
  for (const id of ids) {
    cards.push({
      ...getCardFromID(id),
      id,
      selected: false,
    })
  }

  return { cards }
}

const selectCards = (state, action) => {
  const cards = state.cards.map((card) => {
    return (card.id === action.id)
      ? { ...card, selected: !card.selected }
      : card
  })

  return { cards }
}

const board = (state = getInitialState(), action) => {
  switch (action.type) {
    case ActionType.SELECT_CARD:
      return {
        ...state,
        ...selectCards(state, action),
      }
    default:
      return state
  }
}

export default board
