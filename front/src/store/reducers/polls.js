import { SET_CURRENT_POLL, SET_POLLS, CREATE_POLL, UPDATE_POLL, DELETE_POLL, GET_ALL_POLLS, GET_POLL} from "../actionTypes";

export const VOTACIONES =  (pollss = [], action) => {
    switch (action.type) {
      case GET_ALL_POLLS:
        return action.payload;
      case  GET_POLL:
        return pollss.map((poll) => (poll._id === action.payload._id ? action.payload : poll));
      case CREATE_POLL:
        return [...pollss, action.payload];
      case UPDATE_POLL:
          console.log(pollss.polls)
          console.log(typeof pollss)
        return pollss.map((poll) => (poll._id === action.payload._id ? action.payload : poll));
      case DELETE_POLL:
        return pollss.filter((poll) => poll._id !== action.payload);
      default:
        return pollss;
    }
  };