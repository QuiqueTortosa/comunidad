import axios from 'axios'

const baseUrl = 'http://localhost:4000/api/auth/signin'

const setToken = token => {
    if(token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

const login = async credentials => {
    const { data } = await axios.post(baseUrl, credentials)
    return data
}

export default { login, setToken }    