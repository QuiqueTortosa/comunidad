import { CREATE_USER, UPDATE_USER, GET_ALL_USERS, GET_USER, DELETE_USER } from "../actionTypes";

export const USERS =  (users = [], action) => {
    switch (action.type) {
      case GET_ALL_USERS:
        console.log(typeof users)
        return action.payload;
      case  GET_USER:
        return users.map((user) => (user._id === action.payload._id ? action.payload : user));
      case CREATE_USER:
        return [...users, action.payload];
      case UPDATE_USER:
        return users.map((user) => (user._id === action.payload._id ? action.payload : user));
      case DELETE_USER:
        return users.filter((user) => user._id !== action.payload);
      default:
        return users;
    }
  };