import { SET_CURRENT_POLL, SET_POLLS, CREATE_POLL, UPDATE_POLL, DELETE_POLL, GET_ALL_POLLS, GET_POLL } from "../actionTypes";
import { addError, removeError } from './error'
import votes from "../../services/votes"

export const getPolls = () => {
    return async dispatch => { //Devuelve un dispatch por que asi es como le avisamos de cuand otiene que ser lanzada la accion
        try {
            const polls = await votes.getPolls();
            dispatch({
                type: GET_ALL_POLLS,
                payload: polls
                
            })
            dispatch(removeError())
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
        }
    }
}

export const getCurrentPoll = (id) => {
    return async dispatch => {
        try {
            const poll = await votes.getPollById(id);
            dispatch({
                type: GET_POLL,
                payload: poll
            })
            dispatch(removeError())
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
        }
    }
}

export const getPollBySearch = (query) =>{
    return async dispatch => {
        try {
            console.log("queyr: " +query)
            const data = await votes.getPollsBySearch(query)
            console.log("dATOS: ")
            console.log(data)
            dispatch({
                type: GET_ALL_POLLS,
                payload: data
            })
            dispatch(removeError())
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
        }
    }
}

export const createPoll = (poll) => {
    return async dispatch => {
        try {
            const polls = await votes.createPoll(poll);
            if(polls.message){
                dispatch(addError(1,polls.message))
            }else{
                dispatch({
                    type: CREATE_POLL, 
                    payload: polls
                })
                dispatch(addError(0,"Votacion creada con exito"))
            }
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
        }
    }
}

export const deletePoll = id => {
    return async dispatch => {
        try {
            await votes.deletePoll(id)
            dispatch({
                type: DELETE_POLL, 
                payload: id
            })
            dispatch(addError(0,"Votacion borrada con exito"))
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
        }
    }
}

export const vote = (id, data) => {
    return async dispatch => {
        try {
            const poll = await votes.updatePoll(id, data); //En data va el answer
            if (poll.message) {
                console.log(poll.message)
                dispatch(addError(1,poll.message))
            } else {
                dispatch({
                    type: UPDATE_POLL,
                    payload: poll
                })
                console.log(data)
                dispatch(addError(0,`Has votado la opcion: `+data.answer))
            }
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
        }
    }
}

export const changeVoteStatus = (id,data) => {
    return async dispatch => {
            const polls = await votes.changePollStatus(id,data)
            dispatch({
                type: UPDATE_POLL,
                payload: polls
            })
            dispatch(addError(0,"Has cambiado el estado de la votación"))
        }
}
