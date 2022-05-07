import { addError, removeError } from "./error";
import { SET_CURRENT_USER, AUTH_USER } from '../actionTypes'
import auth from '../../services/auth'
import voteService from '../../services/votes'
import userService from '../../services/users'
import postService from '../../services/posts'
import forumService from "../../services/forum";
import cookie from "js-cookie";
import decode from "jwt-decode";


export const setCurrentUser = user => {
    return async dispatch => {
        try {
            dispatch({
                type: SET_CURRENT_USER, payload: {
                    isAuthenticated: true,
                    user: user
                }
            })
            //dispatch(removeError())
        } catch (err) {
            const error = err.response.data
            dispatch(addError(error.message)) //dispatch viene de redux-thunk, addError viene de nuestro fichero error
        }
    }
}

export const authUser = (credentials) => {
    return async dispatch => {
        try {  
            const { token } = await auth.login(credentials)
            console.log(token)
            auth.setToken(token)
            voteService.setToken(token)
            postService.setToken(token)
            userService.setToken(token)
            forumService.setToken(token)
            cookie.set("token", token)
            dispatch({
                type: AUTH_USER, payload: {
                    isAuthenticated: true,
                    user: {...decode(token)}
                }
            })
            dispatch(removeError())
        } catch (err) {
            console.log("hola2?")
            const error = err.response.data
            console.log(error.message)
            dispatch(addError(error.message)) //dispatch viene de redux-thunk, addError viene de nuestro fichero error
        }
    }
}

export const logout = () => {
    return dispatch => {
        cookie.remove("token")
        auth.setToken(null)
        auth.setToken(null)
        voteService.setToken(null)
        postService.setToken(null)
        userService.setToken(null)
        forumService.setToken(null)
        dispatch(setCurrentUser({}))
        dispatch(removeError())
    }
}