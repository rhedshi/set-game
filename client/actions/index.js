import { ActionType } from './constants.js'

export const selectCard = (id) => ({
  type: ActionType.SELECT_CARD,
  id,
})

export const replaceCards = (ids) => ({
  type: ActionType.REPLACE_CARDS,
  ids,
})
