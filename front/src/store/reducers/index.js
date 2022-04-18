import { combineReducers } from 'redux'
import error from './error'
import auth from './auth'
import {polls, VOTACIONES, currentPoll, ongoingPolls, finishedPolls} from './polls'
import { USERS } from './users'

export default combineReducers({
    auth,
    error,
    polls,
    currentPoll,
    USERS,
    VOTACIONES
})