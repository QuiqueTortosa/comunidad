import { CREATE_DISCUSSSION, UPDATE_DISCUSSSION, DELETE_DISCUSSSION,  GET_ALL_DISCUSSSIONS, GET_DISCUSSSION, CREATE_DISCUSSSION_MESSAGE, UPDATE_DISCUSSSION_MESSAGE, DELETE_DISCUSSSION_MESSAGE, GET_ALL_DISCUSSSION_MESSAGES, REMOVE_DISCUSSION_REPLY_MESSAGE, SET_DISCUSSION_REPLY_MESSAGE} from "../actionTypes";

export const DISCUSSIONS =  (discussions = [], action) => {
    switch (action.type) {
      case GET_ALL_DISCUSSSIONS:
        return action.payload;
      case  GET_DISCUSSSION:
        return discussions.map((d) => (d._id === action.payload._id ? action.payload : d));
      case CREATE_DISCUSSSION:
        return [...discussions, action.payload];
      case UPDATE_DISCUSSSION:
        return discussions.map((d) => (d._id === action.payload._id ? action.payload : d));
      case DELETE_DISCUSSSION:
        return discussions.filter((d) => d._id !== action.payload);
      default:
        return discussions;
    }
  };

  export const DISCUSSION_MESSAGES =  (messages = [], action) => {
    switch (action.type) {
      case GET_ALL_DISCUSSSION_MESSAGES:
        console.log(typeof messages)
        return action.payload;
      case CREATE_DISCUSSSION_MESSAGE:
        return [...messages, action.payload];
      case UPDATE_DISCUSSSION_MESSAGE:
        return messages.map((message) => (message._id === action.payload._id ? action.payload : message));
      case DELETE_DISCUSSSION_MESSAGE:
        return messages.filter((message) => message._id !== action.payload);
      default:
        return messages;
    }
  };

  export const REPLY_DISCUSSION_MESSAGE = (replyMessage = {}, action) => {
    switch(action.type){
      case SET_DISCUSSION_REPLY_MESSAGE:
          return replyMessage = action.payload
      case REMOVE_DISCUSSION_REPLY_MESSAGE:
          return replyMessage = action.payload
      default:
          return replyMessage;

  }
  }