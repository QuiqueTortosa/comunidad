import { CREATE_DISCUSSSION, UPDATE_DISCUSSSION, DELETE_DISCUSSSION,  GET_ALL_DISCUSSSIONS, GET_DISCUSSSION, CREATE_DISCUSSSION_MESSAGE, UPDATE_DISCUSSSION_MESSAGE, DELETE_DISCUSSSION_MESSAGE, GET_ALL_DISCUSSSION_MESSAGES, REMOVE_DISCUSSION_REPLY_MESSAGE, SET_DISCUSSION_REPLY_MESSAGE } from "../actionTypes";
import { addError, removeError } from './error'
import forumService from "../../services/forum"

export const getDiscussions = () => {
    return async dispatch => {
        try {
            const data = await forumService.getDiscussions()
            dispatch({
                type: GET_ALL_DISCUSSSIONS,
                payload: data
            })
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
        }
    }
}

export const getDiscussionsBySearch = (query) =>{
    return async dispatch => {
        try {
            console.log("queyr: " +query)
            const data = await forumService.getDiscussionBySearch(query)
            console.log("dATOS: ")
            console.log(data)
            dispatch({
                type: GET_ALL_DISCUSSSIONS,
                payload: data
            })
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
        }
    }
}


export const createDiscussion = discussion => {
    return async dispatch => {
        try {
            const data = await forumService.createDiscussion(discussion)
            if(data.message){
                dispatch(addError(1,data.message))
            }else {
                dispatch({
                    type: CREATE_DISCUSSSION,
                    payload: data
                })
                dispatch(addError(0,"Discursión creada con exito"))
            }
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
        }
    }
}

export const updateDiscussion = (id, discussion) => {
    return async dispatch => {
        try {
            console.log(discussion)
            const data = await forumService.updateDiscussion(id, discussion)
            dispatch({
                type: UPDATE_DISCUSSSION,
                payload: data
            })
            dispatch(addError(0,"Discursión actualizada con exito"))
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
        }
    }
}

export const voteDiscussion = (id, data) => {
    return async dispatch => {
        try {
            const vote = await forumService.updatePoll(id, data); //En data va el answer
            if (vote.message) {
                console.log(vote.message)
                dispatch(addError(1,vote.message))
            } else {
                dispatch({
                    type: UPDATE_DISCUSSSION,
                    payload: vote
                })
                console.log(data)
                dispatch(addError(0,`Has votado la opcion: `+data.answer))
            }
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
        }
    }
}

export const deleteDiscussion = id => {
    return async dispatch => {
        try {
            await forumService.deleteDiscussion(id)
            dispatch({
                type: DELETE_DISCUSSSION,
                payload: id
            })
            dispatch(addError(0,"Discursión borrada con exito"))
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
        }
    }
}

export const getDiscussionMessages = (discId) => {
    return async dispatch => {
        try {
            const data = await forumService.getDiscussionById(discId)
            console.log(data)
            dispatch({
                type: GET_ALL_DISCUSSSION_MESSAGES,
                payload: data.messages
            })
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
        }
    }
} 

export const createDiscussionMessage = (discId, message) => {
    return async dispatch => {
        try {
            const data = await forumService.createMessage(discId, message)
            console.log(data)
            dispatch({
                type: CREATE_DISCUSSSION_MESSAGE,
                payload: data
            })
            dispatch(addError(0,"Mensaje creado con exito"))
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
        }
    }
}

export const updateDiscussionMessage = (id, message) => {
    return async dispatch => {
        try {
            console.log(message)
            const data = await forumService.updateMessage(id, message)
            dispatch({
                type: UPDATE_DISCUSSSION_MESSAGE,
                payload: data
            })
            dispatch(addError(0,"Mensaje actualizado con exito"))
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
        }
    }
}

export const deleteDiscussionMessage = (discId, messageId) => {
    return async dispatch => {
        try {
            const data = await forumService.deleteMessage(discId, messageId)
            console.log(data)
            dispatch({
                type: DELETE_DISCUSSSION_MESSAGE,
                payload: messageId
            })
            dispatch(addError(0,"Mensaje borrado con exito"))
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
        }
    }
}

export const setDiscussionReplyMessage = replyMessage => {
    return async dispatch => {
        try {
            dispatch({
                type: SET_DISCUSSION_REPLY_MESSAGE, 
                payload: replyMessage
            })
            dispatch(removeError())
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
        }
    }
} 

export const removeDiscussionReplyMessage = () => {
    return async dispatch => {
        try {
            dispatch({
                type: REMOVE_DISCUSSION_REPLY_MESSAGE, 
                payload: {}
            })
            dispatch(removeError())
        } catch (err) {
            const error = err.response.data
            dispatch(addError(1,error.message))
        }
    }
}