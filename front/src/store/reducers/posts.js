import { CREATE_POST, UPDATE_POST, DELETE_POST, GET_ALL_POSTS, GET_POST } from "../actionTypes";

export const POSTS =  (posts = [], action) => {
    switch (action.type) {
      case GET_ALL_POSTS:
        console.log(typeof posts)
        return action.payload;
      case  GET_POST:
        return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
      case CREATE_POST:
        return [...posts, action.payload];
      case UPDATE_POST:
        return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
      case DELETE_POST:
        return posts.filter((post) => post._id !== action.payload);
      default:
        return posts;
    }
  };