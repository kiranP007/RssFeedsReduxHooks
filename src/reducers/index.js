import { combineReducers } from 'redux'
import home from "./homeReducer"
import create from "./createReducer"
import feed from "./feedReducer"

export default combineReducers({ home, create, feed })