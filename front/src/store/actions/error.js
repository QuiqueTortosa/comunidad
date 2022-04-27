import { ADD_ERROR, REMOVE_ERROR } from "../actionTypes";

//Devuelve el tipo de error y la informacion
export const addError = (type, message) => {
    return async dispatch => {
        try {
            dispatch({
                type: ADD_ERROR,
                payload: {
                    type,
                    message
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const removeError = () => ({
    type: REMOVE_ERROR,
})