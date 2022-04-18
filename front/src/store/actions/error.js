import { ADD_ERROR, REMOVE_ERROR } from "../actionTypes";

//Devuelve el tipo de error y la informacion
export const addError = error => ({
    type: ADD_ERROR,
    error
})

export const removeError = () => ({
    type: REMOVE_ERROR,
})