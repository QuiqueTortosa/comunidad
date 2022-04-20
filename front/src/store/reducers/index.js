import { combineReducers } from 'redux'
import error from './error'
import auth from './auth'
import { VOTACIONES,} from './polls'
import { USERS } from './users'
import { POSTS } from './posts'

export default combineReducers({
    auth,
    error,
    USERS,
    VOTACIONES,
    POSTS
})