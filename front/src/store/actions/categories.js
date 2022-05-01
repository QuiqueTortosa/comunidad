import { CREATE_CATEGORY, DELETE_CATEGORY, GET_ALL_CATEGORIES } from "../actionTypes";
import { addError, removeError } from './error'
import forumService from "../../services/forum"

export const getCategories = () => {
    return async dispatch => {
        try {
            const data = await forumService.getCategories()
            dispatch({
                type: GET_ALL_CATEGORIES,
                payload: data
            })
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
        }
    }
}

export const createCategory = category => {
    return async dispatch => {
        try {
            console.log(category)
            const data = await forumService.createCategory(category)
            if(data.message){
                dispatch(addError(1,data.message))
            }else {
                dispatch({
                    type: CREATE_CATEGORY,
                    payload: data
                })
                dispatch(addError(0,"Categoría creada con exito"))
            }
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
        }
    }
}

export const deleteCategory = id => {
    return async dispatch => {
        try {
            await forumService.deleteCategory(id)
            dispatch({
                type: DELETE_CATEGORY,
                payload: id
            })
            dispatch(addError(0,"Categoría borrada con exito"))
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
        }
    }
}