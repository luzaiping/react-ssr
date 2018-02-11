import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import { routerMiddleware } from 'react-router-redux'
import { sagaMiddleware } from '../saga/rootSaga'
import rootReducer from '../reducer'

export default function configureStore(history, preloadedState) {
  
  const enhancer = compose(
    applyMiddleware(thunk, routerMiddleware(history))
  )

  const store = createStore(rootReducer, preloadedState, enhancer)

  return store
}
