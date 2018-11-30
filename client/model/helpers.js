import { Colors, Fills, Shapes } from './constants.js'
import _ from 'lodash'

const NUMBER_OF_CARDS = 81
const NUMBER_OF_PROPS = 4

const ALL_CARDS = _.range(NUMBER_OF_CARDS)

export const genRandomBoard = () => {
  return _.shuffle(ALL_CARDS).slice(0, 12)
}

export const genRandomCard = () => {
  return {
    color: _.sample(Colors),
    fill: _.sample(Fills),
    number: Math.ceil(Math.random() * 3),
    shape: _.sample(Shapes),
  }
}

export const genThreeRandomCards = (fromIDs = ALL_CARDS, excludeIDs) => {
  return _.shuffle(fromIDs.filter((id) => !excludeIDs.includes(id))).slice(0, 3)
}

export const getCardFromID = (id) => {
  let index = []
  for (let i = 0; i < NUMBER_OF_PROPS; i++) {
    index.push(id % 3)
    id = Math.floor(id / 3)
  }

  return {
    color: Colors[index[0]],
    fill: Fills[index[1]],
    number: index[2] + 1,
    shape: Shapes[index[3]],
  }
}

export const isValidSet = (id1, id2, id3) => {
  let ids = [id1, id2, id3]

  for (let i = 0; i < NUMBER_OF_PROPS; i++) {
    if (_.sum(ids) % 3 !== 0) {
      return false
    }
    ids = ids.map((id) => Math.floor(id / 3))
  }

  return true
}
