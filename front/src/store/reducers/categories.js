import { CREATE_CATEGORY, DELETE_CATEGORY, GET_ALL_CATEGORIES } from "../actionTypes";

export const CATEGORIES =  (categories = [], action) => {
    switch (action.type) {
      case GET_ALL_CATEGORIES:
        return action.payload;
      case CREATE_CATEGORY:
        return [...categories, action.payload];
      case DELETE_CATEGORY:
        return categories.filter((c) => c._id !== action.payload);
      default:
        return categories;
    }
  };