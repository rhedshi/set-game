import { genRandomBoard } from '../model/helpers.js';

const board = (state = genRandomBoard(), action) => {
  switch(action.type) {
    default:
      return state;
  }
}

export default board
