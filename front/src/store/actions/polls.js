import { SET_CURRENT_POLL, SET_POLLS, CREATE_POLL, UPDATE_POLL, DELETE_POLL, GET_ALL_POLLS, GET_POLL } from "../actionTypes";
import { addError, removeError } from './error'
import votes from "../../services/votes"

export const getPolls = () => {
    return async dispatch => { //Devuelve un dispatch por que asi es como le avisamos de cuand otiene que ser lanzada la accion
        try {
            const polls = await votes.getPolls();
            console.log("poleas")
            console.log(polls)
            dispatch({
                type: GET_ALL_POLLS,
                payload: polls
                
            })
            dispatch(removeError())
        } catch (err) {
            console.log(err)
             //dispatch viene de redux-thunk, addError viene de nuestro fichero error
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
            const error = err.response.data;
            dispatch(addError(error.message))
        }
    }
}

export const createPoll = (poll) => {
    return async dispatch => {
        try {
            const polls = await votes.createPoll(poll);
            dispatch({
                type: CREATE_POLL, 
                payload: polls
            })
            dispatch(removeError())
        } catch (err) {
            const error = err.response.data;
            dispatch(addError(error.message))
        }
    }
}

export const deletePoll = id => {
    return async dispatch => {
        try {
            console.log("KEKW")
            await votes.deletePoll(id);
            console.log("KEKW")
            dispatch({
                type: DELETE_POLL, 
                payload: id
            })
            dispatch(removeError())
        } catch (err) {
            const error = err.response.data;
            dispatch(addError(error.message))
        }
    }
}

export const vote = (id, data) => {
    return async dispatch => {
        try {
            const poll = await votes.updatePoll(id, data); //En data va el answer
            if (poll.message) {
                dispatch(addError(poll.message))
            } else {
                console.log("Eh")
                console.log(poll)
                dispatch({
                    type: UPDATE_POLL,
                    payload: poll
                })
                dispatch(removeError())
            }
        } catch (err) {
            return err
        }
    }
}

export const changeVoteStatus = (id,data) => {
    return async dispatch => {

            const polls = await votes.changePollStatus(id,data)
            console.log("he cambiado el stado")
            dispatch({
                type: UPDATE_POLL,
                payload: polls
            })
            dispatch(removeError())
    }
}




/*
export const getPolls = () => {
    return async dispatch => { //Devuelve un dispatch por que asi es como le avisamos de cuand otiene que ser lanzada la accion
        try {
            const polls = await votes.getPolls();
            dispatch({
                type: SET_POLLS, payload: {
                    polls
                }
            })
            dispatch(removeError())
        } catch (err) {
            const error = err.response.data
            dispatch(addError(error.message)) //dispatch viene de redux-thunk, addError viene de nuestro fichero error
        }
    }
}

export const getCurrentPoll = (id) => {
    return async dispatch => {
        try {
            const poll = await votes.getPollById(id);
            dispatch({
                type: SET_CURRENT_POLL,
                payload: poll
            })
            dispatch(removeError())
        } catch (err) {
            const error = err.response.data;
            dispatch(addError(error.message))
        }
    }
}

export const createPoll = (poll) => {
    return async dispatch => {
        try {
            await votes.createPoll(poll);
            console.log("nose")
            const polls = await votes.getPolls();
            dispatch({
                type: SET_POLLS, payload: {
                    polls
                }
            })
            dispatch(removeError())
        } catch (err) {
            const error = err.response.data;
            dispatch(addError(error.message))
        }
    }
}

export const deletePoll = id => {
    return async dispatch => {
        try {
            await votes.deletePoll(id);
            const polls = await votes.getPolls();
            console.log("KEKW")
            console.log(polls)
            dispatch({
                type: SET_POLLS, payload: {
                    polls
                }
            })
            dispatch(removeError())
        } catch (err) {
            const error = err.response.data;
            dispatch(addError(error.message))
        }
    }
}

export const vote = (id, data) => {
    return async dispatch => {
        try {
            const poll = await votes.updatePoll(id, data); //En data va el answer
            if (poll.message) {
                dispatch(addError(poll.message))
            } else {
                console.log("Eh")
                console.log(poll)
                dispatch({
                    type: SET_CURRENT_POLL,
                    payload: poll
                })
                dispatch(removeError())
            }
        } catch (err) {
            return err
        }
    }
}

export const changeVoteStatus = (id,data) => {
    return async dispatch => {
        try {
            await votes.changePollStatus(id,data)
            console.log("he cambiado el stado")
            const polls = await votes.getPolls();
            dispatch({
                type: SET_POLLS, payload: {
                    polls
                }
            })
            dispatch(removeError())
        } catch (err) {
            const error = err.response.data;
            dispatch(addError(error.message))
        }
    }
}

*/