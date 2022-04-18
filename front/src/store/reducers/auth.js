import { SET_CURRENT_USER, AUTH_USER } from "../actionTypes";

const DEFAULT_STATE = {
    isAuthenticated: false,
    user: {
        selectedFile: "/images/avatar.png"
    }
}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case SET_CURRENT_USER:
            return state = action.payload
        case AUTH_USER:
            return state = action.payload
        default:
            return state;

    }
}