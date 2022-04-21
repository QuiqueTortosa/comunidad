import { CREATE_POST, UPDATE_POST, DELETE_POST, GET_ALL_POSTS, GET_POST, GET_ALL_MESSAGES,CREATE_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE, REMOVE_REPLY_MESSAGE, SET_REPLY_MESSAGE } from "../actionTypes";

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

  export const MESSAGES =  (messages = [], action) => {
    switch (action.type) {
      case GET_ALL_MESSAGES:
        console.log(typeof messages)
        return action.payload;
      case CREATE_MESSAGE:
        return [...messages, action.payload];
      case UPDATE_MESSAGE:
        return messages.map((message) => (message._id === action.payload._id ? action.payload : message));
      case DELETE_MESSAGE:
        return messages.filter((message) => message._id !== action.payload);
      default:
        return messages;
    }
  };

  export const REPLY_MESSAGE = (replyMessage = {}, action) => {
    switch(action.type){
      case SET_REPLY_MESSAGE:
          return replyMessage = action.payload
      case REMOVE_REPLY_MESSAGE:
          return replyMessage = action.payload
      default:
          return replyMessage;

  }
  }


  

