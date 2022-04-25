import axios from 'axios'
import cookie from "js-cookie";

const baseUrl = 'http://localhost:4000/api/posts'

let token = `Bearer ${cookie.get("token")}`

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const config = {
  headers: {
    Authorization: token
  }
}

const getPosts = async () => {
  const { data } = await axios.get(baseUrl + "/", {
    headers: {
      Authorization: token
    }
  })
  return data
}
const getPostsBySearch = async query => {
    console.log("query: "+query)
    const { data } = await axios.get(`${baseUrl}/search/?searchQuery=${query || 'none'}`, {
      headers: {
        Authorization: token
      }
    })
    return data
  }

const getPostById = async id => {
  const { data } = await axios.get(`${baseUrl}/find/${id}`, {
    headers: {
      Authorization: token
    }
  })
  return data
}

const deletePost = async id => {
  const { data } = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: token
    }
  })
  return data
}
const updatePost = async (id, post) => {
  console.log(id)
  console.log(post)
  const { data } = await axios.put(`${baseUrl}/${id}`, post, {
    headers: {
      Authorization: token
    }
  })
  return data
}
const createPost = async (post) => {
  const { data } = await axios.post(baseUrl + "/", post, {
    headers: {
      Authorization: token
    }
  })
  return data
}

const createMessage = async (postId, message) => {
  const { data } = await axios.post(`${baseUrl}/message/${postId}`, message, {
    headers: {
      Authorization: token
    }
  })
  return data
}

const deleteMessage = async (postId,messageId) => {
  const { data } = await axios.delete(`${baseUrl}/${postId}/message/${messageId}`, {
    headers: {
      Authorization: token
    }
  })
  return data
}

export default {  getPostById, getPosts, getPostsBySearch, deletePost, updatePost, createPost, createMessage,deleteMessage, setToken }