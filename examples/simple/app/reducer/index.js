import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
// import global from ''

export default combineReducers({
  counter,
  routing: routerReducer
})
