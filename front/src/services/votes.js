import axios from 'axios'
import cookie from "js-cookie";

const baseUrl = 'http://localhost:4000/api/vote'

let token = `Bearer ${cookie.get("token")}`

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const config = {
  headers: {
    Authorization: token
  }
}

const getPolls = async () => {
  const { data } = await axios.get(baseUrl + "/", {
    headers: {
      Authorization: token
    }
  })
  return data
}
const getPollById = async id => {
  console.log(token)
  const { data } = await axios.get(`${baseUrl}/find/${id}`,{
    headers: {
      Authorization: token
    }
  })
  return data
}
const deletePoll = async id => {
  const { data } = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: token
    }
  })
  return data
}
const updatePoll = async (id, poll) => {
  console.log(id)
  console.log(poll)
  const { data } = await axios.put(`${baseUrl}/${id}`, poll, {
    headers: {
      Authorization: token
    }
  })
  return data
}
const createPoll = async (poll) => {
  console.log(poll)
  const { data } = await axios.post(baseUrl + "/", poll, {
    headers: {
      Authorization: token
    }
  })
  return data
}

const changePollStatus = async (id, status) => {
  console.log("Estado" + status)
  const {data} = await axios.put(`${baseUrl}/changeStatus/${id}`, status, {
    headers: {
      Authorization: token
    }
  })
  return data
}

const getPollsBySearch = async query => {
  console.log("query: "+query)
  const { data } = await axios.get(`${baseUrl}/search/?searchQuery=${query || 'none'}`, {
    headers: {
      Authorization: token
    }
  })
  return data
}

//, { withCredentials: true }
export default { getPollsBySearch, getPolls, getPollById, deletePoll, updatePoll, createPoll, changePollStatus, setToken }