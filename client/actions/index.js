import { ActionType } from './constants.js'

export const selectCard = (id) => ({
  type: ActionType.SELECT_CARD,
  id,
})
