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
    const { data } = await axios.get(baseUrl + "/",{
      headers: {
        Authorization: token
      }
    })
    return data
  }
  const getUserById = async id => {
    const { data } = await axios.get(`${baseUrl}/find/${id}`,{
      headers: {
        Authorization: token
      }
    })
    return data
  }

  const getUsersBySearch = async query => {
    console.log("query: "+query)
    const { data } = await await axios.get(`${baseUrl}/search/?searchQuery=${query || 'none'}`, {
      headers: {
        Authorization: token
      }
    })
    return data
  }

  const deleteUser = async id => {
    const { data } = await axios.delete(`${baseUrl}/${id}`, {
      headers: {
        Authorization: token
      }
    })
    return data
  }
  const updateUser = async (id, user) => {
    const { data } = await axios.put(`${baseUrl}/user/${id}`, user, {
      headers: {
        Authorization: token
      }
    })
    return data
  }
  const createUser = async (user) => {
    const { data } = await axios.post(baseUrl + "/", user, {
      headers: {
        Authorization: token
      }
    })
    return data
  }

  const changePassword = async (id,password) => {
    const { data } = await axios.put(`${baseUrl}/changePassword/${id}`, password , {
      headers: {
        Authorization: token
      }
    })
    return data
  }

  export default { getUsers, getUserById, deleteUser, updateUser, changePassword, createUser, getUsersBySearch, setToken }