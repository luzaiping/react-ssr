import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import { routerMiddleware } from 'react-router-redux'
// import createSagaMiddleware from 'redux-saga'
// import rootSage from '../saga/rootSaga'
import rootReducer from '../reducer'

export default function configureStore(history, preloadedState) {
  
  // const sagaMiddleware = createSagaMiddleware()
  
  const enhancer = compose(
    applyMiddleware(thunk, routerMiddleware(history))
  )

  const store = createStore(rootReducer, preloadedState, enhancer)

  // sagaMiddleware.run(rootSage)
  
  return store
}
