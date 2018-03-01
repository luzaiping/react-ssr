import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import global from './global'

export default combineReducers({
  counter,
  global,
  routing: routerReducer
})
