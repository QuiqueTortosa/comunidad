import { CREATE_USER, UPDATE_USER, GET_ALL_USERS, GET_USER, DELETE_USER, ADD_ERROR } from "../actionTypes";
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
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
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
            dispatch(addError(1,err.response.data.message))
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
            dispatch(addError(1,err.response.data.message))
        }
    }
}

export const createUser = user => {
    return async dispatch => {
        try {
            const data = await userService.createUser(user)
            if(data.message){
                dispatch({
                    type: ADD_ERROR,
                    payload: {
                        type: 1,
                        message: data.message
                    }
                })
            }else{
                dispatch({
                    type: CREATE_USER,
                    payload: data
                })
                dispatch(addError(0,"Usuario añadido con exito"))
            }
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
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
            dispatch(addError(0,"Usuario actualizado con exito"))
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
        }
    }
}

export const changePassword = (id, password) => {
    return async dispatch => {
        try {
            const data = await userService.changePassword(id, password)
            if(data.message) {
                dispatch({
                    type: ADD_ERROR,
                    payload: {
                        type: 1,
                        message: data.message
                    }
                })
            }else {
                dispatch({
                    type: UPDATE_USER,
                    payload: data
                })
                dispatch(addError(0,"Contraseña cambiada con exito"))
            }
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
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
            dispatch(addError(0,"Usuario borrado con exito"))
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
        }
    }
}