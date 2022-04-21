import { CREATE_USER, UPDATE_USER, GET_ALL_USERS, GET_USER, DELETE_USER } from "../actionTypes";
import { addError, removeError } from './error'
import userService from "../../services/users"

export const getUsers = () => {
    return async dispatch => {
        try {
            const data = await userService.getUsers()
            dispatch({
                type: GET_ALL_USERS,
                payload: data
            })
            dispatch(removeError())
        } catch (err) {
            console.log(err)
        }
    }
}

export const getUsersBySearch = (query) =>{
    return async dispatch => {
        try {
            const data = await userService.getUsersBySearch(query)
            dispatch({
                type: GET_ALL_USERS,
                payload: data
            })
            dispatch(removeError())
        } catch (err) {
            console.log(err)
        }
    }
}

export const getUserById = id => {
    return async dispatch => {
        try {
            const data = await userService.getUser(id)
            dispatch({
                type: GET_USER,
                payload: data
            })
            dispatch(removeError())
        } catch (err) {
            const error = err.response.data
            dispatch(addError(error.message))
        }
    }
}

export const createUser = user => {
    return async dispatch => {
        try {
            const data = await userService.createUser(user)
            dispatch({
                type: CREATE_USER,
                payload: data
            })
            dispatch(removeError())
        } catch (err) {
            const error = err.response.data
            dispatch(addError(error.message))
        }
    }
}
export const updateUser = (id, user) => {
    return async dispatch => {
        try {
            const data = await userService.updateUser(id, user)
            dispatch({
                type: UPDATE_USER,
                payload: data
            })
            dispatch(removeError())
        } catch (err) {
            const error = err.response.data
            dispatch(addError(error.message))
        }
    }
}

export const deleteUser = id => {
    return async dispatch => {
        try {
            await userService.deleteUser(id)
            dispatch({
                type: DELETE_USER,
                payload: id
            })
            dispatch(removeError())
        } catch (err) {
            const error = err.response.data
            dispatch(addError(error.message))
        }
    }
}