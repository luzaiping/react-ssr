import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import reducer from '../reducer'

const rootReducer = combineReducers({
  ...reducer,
  routing: routerReducer
})

let configureFileName = ['production', 'beat'].includes(process.env.NODE_ENV) ? 'configureStore.prod' : 'configureStore.dev'
const configureStore = require(`./${configureFileName}`).default

export default (preloadedState) => {
  return configureStore(rootReducer, preloadedState)
}
