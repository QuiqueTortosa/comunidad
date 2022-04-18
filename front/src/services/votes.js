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
  const { data } = await axios.get(baseUrl + "/", config)
  return data
}
const getPollById = async id => {
  console.log(token)
  const { data } = await axios.get(`${baseUrl}/${id}`, config,)
  return data
}
const deletePoll = async id => {
  const { data } = await axios.delete(`${baseUrl}/${id}`, config)
  return data
}
const updatePoll = async (id, poll) => {
  console.log(id)
  console.log(poll)
  const { data } = await axios.put(`${baseUrl}/${id}`, poll, config)
  return data
}
const createPoll = async (poll) => {
  const { data } = await axios.post(baseUrl + "/", poll, config)
  return data
}

const changePollStatus = async (id, status) => {
  console.log("Estado" + status)
  const {data} = await axios.put(`${baseUrl}/changeStatus/${id}`, status, config)
  return data
}

//, { withCredentials: true }
export default { getPolls, getPollById, deletePoll, updatePoll, createPoll, changePollStatus, setToken }