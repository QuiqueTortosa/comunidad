
import axios from 'axios'
import cookie from "js-cookie";

const baseUrl = 'http://localhost:4000/api/forum'
const categoriesUrl = 'http://localhost:4000/api/categories'


let token = `Bearer ${cookie.get("token")}`

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const config = {
  headers: {
    Authorization: token
  }
}

const getDiscussions = async () => {
  const { data } = await axios.get(baseUrl + "/", {
    headers: {
      Authorization: token
    }
  })
  return data
}
const getDiscussionBySearch = async query => {
    const { data } = await axios.get(`${baseUrl}/search/?searchQuery=${query || 'none'}`, {
      headers: {
        Authorization: token
      }
    })
    return data
  }

const getDiscussionById = async id => {
  const { data } = await axios.get(`${baseUrl}/find/${id}`, {
    headers: {
      Authorization: token
    }
  })
  return data
}

const deleteDiscussion = async id => {
  const { data } = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: token
    }
  })
  return data
}
const updateDiscussion = async (id, discussion) => {
  const { data } = await axios.put(`${baseUrl}/disc/${id}`, discussion, {
    headers: {
      Authorization: token
    }
  })
  return data
}

const updatePoll = async (discId, poll) => {
  const { data } = await axios.put(`${baseUrl}/vote/${discId}`, poll, {
    headers: {
      Authorization: token
    }
  })
  return data
}
const createDiscussion = async (discussion) => {
  const { data } = await axios.post(baseUrl + "/", discussion, {
    headers: {
      Authorization: token
    }
  })
  return data
}

const createMessage = async (discId, message) => {
  const { data } = await axios.post(`${baseUrl}/message/${discId}`, message, {
    headers: {
      Authorization: token
    }
  })
  return data
}

const deleteMessage = async (discId,messageId) => {
  const { data } = await axios.delete(`${baseUrl}/${discId}/message/${messageId}`, {
    headers: {
      Authorization: token
    }
  })
  return data
}

const updateMessage = async (id, message) => {
  const { data } = await axios.put(`${baseUrl}/message/${id}`, {message}, {
    headers: {
      Authorization: token
    }
  })
  return data
}

const getCategories = async () => {
  const { data } = await axios.get(categoriesUrl + "/", {
    headers: {
      Authorization: token
    }
  })
  return data
}


const deleteCategory = async id => {
  const { data } = await axios.delete(`${categoriesUrl}/${id}`, {
    headers: {
      Authorization: token
    }
  })
  return data
}

const createCategory = async (category) => {
  const { data } = await axios.post(categoriesUrl + "/",{name: category}, {
    headers: {
      Authorization: token
    }
  })
  return data
}


export default { createCategory, updatePoll,deleteCategory,getCategories,getDiscussionById, getDiscussions, getDiscussionBySearch, deleteDiscussion, updateDiscussion, createDiscussion, createMessage,deleteMessage, updateMessage, setToken }