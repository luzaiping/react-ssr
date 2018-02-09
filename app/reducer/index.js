import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'

const reducer = {
  counter
}

export default combineReducers({
  ...reducer,
  routing: routerReducer
})
