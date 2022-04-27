import { CREATE_POST, UPDATE_POST, DELETE_POST, GET_ALL_POSTS, GET_ALL_MESSAGES,CREATE_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE,  REMOVE_REPLY_MESSAGE, SET_REPLY_MESSAGE } from "../actionTypes";
import { addError, removeError } from './error'
import postService from "../../services/posts"

export const getPosts = () => {
    return async dispatch => {
        try {
            const data = await postService.getPosts()
            dispatch({
                type: GET_ALL_POSTS,
                payload: data
            })
            dispatch(removeError())
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
        }
    }
}

export const getPostsBySearch = (query) =>{
    return async dispatch => {
        try {
            console.log("queyr: " +query)
            const data = await postService.getPostsBySearch(query)
            console.log("dATOS: ")
            console.log(data)
            dispatch({
                type: GET_ALL_POSTS,
                payload: data
            })
            dispatch(removeError())
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
        }
    }
}


export const createPost = post => {
    return async dispatch => {
        try {
            const data = await postService.createPost(post)
            if(data.message){
                dispatch(addError(1,data.message))
            }else {
                dispatch({
                    type: CREATE_POST,
                    payload: data
                })
                dispatch(addError(0,"Noticia creada con exito"))
            }
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
        }
    }
}

export const updatePost = (id, post) => {
    return async dispatch => {
        try {
            console.log(post)
            const data = await postService.updatePost(id, post)
            dispatch({
                type: UPDATE_POST,
                payload: data
            })
            dispatch(addError(0,"Noticia actualizada con exito"))
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
        }
    }
}

export const deletePost = id => {
    return async dispatch => {
        try {
            await postService.deletePost(id)
            dispatch({
                type: DELETE_POST,
                payload: id
            })
            dispatch(addError(0,"Noticia borrada con exito"))
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
        }
    }
}

export const getMessages = (postId) => {
    return async dispatch => {
        try {
            const data = await postService.getPostById(postId)
            console.log(data)
            dispatch({
                type: GET_ALL_MESSAGES,
                payload: data.messages
            })
            dispatch(removeError())
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
        }
    }
} 

export const createMessage = (postId, message) => {
    return async dispatch => {
        try {
            const data = await postService.createMessage(postId, message)
            console.log(data)
            dispatch({
                type: CREATE_MESSAGE,
                payload: data
            })
            dispatch(addError(0,"Mensaje creado con exito"))
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
        }
    }
}

export const deleteMessage = (postId, messageId) => {
    return async dispatch => {
        try {
            const data = await postService.deleteMessage(postId, messageId)
            console.log(data)
            dispatch({
                type: DELETE_MESSAGE,
                payload: messageId
            })
            dispatch(addError(0,"Mensaje borrado con exito"))
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
        }
    }
}

export const setReplyMessage = replyMessage => {
    return async dispatch => {
        try {
            dispatch({
                type: SET_REPLY_MESSAGE, 
                payload: replyMessage
            })
            dispatch(removeError())
        } catch (err) {
            dispatch(addError(1,err.response.data.message))
        }
    }
} 

export const removeReplyMessage = () => {
    return async dispatch => {
        try {
            dispatch({
                type: REMOVE_REPLY_MESSAGE, 
                payload: {}
            })
            dispatch(removeError())
        } catch (err) {
            const error = err.response.data
            dispatch(addError(1,error.message))
        }
    }
}