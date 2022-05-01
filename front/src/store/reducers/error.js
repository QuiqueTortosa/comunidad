import { ADD_ERROR, REMOVE_ERROR } from '../actionTypes';

export default (state = { }, action) => {
  switch (action.type) {
    case ADD_ERROR:
      return state = action.payload
    case REMOVE_ERROR:
      return { };
    default:
      return state;
  }
};