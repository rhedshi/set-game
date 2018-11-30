import { ActionType } from '../actions/constants.js'
import {
  genRandomBoard,
  genThreeRandomCards,
  getCardFromID,
} from '../model/helpers.js'
import _ from 'lodash'

const MAX_RECENT_CARDS = 27

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

  return {
    cards,
    recent: [],
  }
}

const selectCards = (state, action) => {
  const cards = state.cards.map((card) => {
    return (card.id === action.id)
      ? { ...card, selected: !card.selected }
      : card
  })

  return {
    ...state,
    cards,
  }
}

const replaceCards = (state, action) => {
  const newCards = genThreeRandomCards(
    undefined,
    [..._.map(state.cards, 'id'), ...state.recent],
  )

  let i = 0
  const cards = state.cards.map((card) => {
    if (card.id === action.ids[i]) {
      const id = newCards[i++]
      return {
        ...getCardFromID(id),
        id,
        selected: false,
      }
    }
    return card
  })
  const recent = [...state.recent, ...newCards].slice(-MAX_RECENT_CARDS)

  return {
    ...state,
    cards,
    recent,
  }
}

const board = (state = getInitialState(), action) => {
  switch (action.type) {
    case ActionType.SELECT_CARD:
      return {
        ...state,
        ...selectCards(state, action),
      }
    case ActionType.REPLACE_CARDS:
      return {
        ...state,
        ...replaceCards(state, action),
      }
    default:
      return state
  }
}

export default board
