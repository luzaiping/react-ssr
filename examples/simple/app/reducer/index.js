import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'

const rootReducer = {
  counter
}

export default combineReducers({
  ...rootReducer,
  routing: routerReducer
})
