import { combineReducers } from 'redux'
import error from './error'
import auth from './auth'
import { VOTACIONES,} from './polls'
import { USERS } from './users'
import { POSTS, MESSAGES, REPLY_MESSAGE } from './posts'
import { DISCUSSIONS, DISCUSSION_MESSAGES, REPLY_DISCUSSION_MESSAGE } from './forum'
import { CATEGORIES } from './categories'

export default combineReducers({
    auth,
    error,
    USERS,
    VOTACIONES,
    POSTS,
    MESSAGES,
    REPLY_MESSAGE,
    DISCUSSIONS,
    DISCUSSION_MESSAGES,
    REPLY_DISCUSSION_MESSAGE,
    CATEGORIES
})