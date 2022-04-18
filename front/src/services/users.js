import axios from 'axios'
import cookie from "js-cookie";

const baseUrl = 'http://localhost:4000/api/users'

let token = `Bearer ${cookie.get("token")}`

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const config = {
  headers: {
    Authorization: token
  }
}

  const getUsers = async () => {
    const { data } = await axios.get(baseUrl + "/", config)
    return data
  }
  const getUserById = async id => {
    console.log(token)
    const { data } = await axios.get(`${baseUrl}/find/${id}`, config,)
    return data
  }

  const getUsersBySearch = async query => {
    console.log("query: "+query)
    const { data } = await await axios.get(`${baseUrl}/search/?searchQuery=${query || 'none'}`, config)
    return data
  }

  const deleteUser = async id => {
    const { data } = await axios.delete(`${baseUrl}/${id}`, config)
    return data
  }
  const updateUser = async (id, user) => {
    const { data } = await axios.put(`${baseUrl}/${id}`, user, config)
    return data
  }
  const createUser = async (user) => {
    const { data } = await axios.post(baseUrl + "/", user, config)
    return data
  }

  export default { getUsers, getUserById, deleteUser, updateUser, createUser, getUsersBySearch, setToken }