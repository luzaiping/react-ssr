import { createStore, applyMiddleware, compose } from 'redux'
// import createHistory from 'history/lib/createHashHistory'

// import getRoutes from '../routes'
import thunk from 'redux-thunk'
// import createSagaMiddleware from 'redux-saga'
// import rootSage from '../saga/rootSaga'

// const sagaMiddleware = createSagaMiddleware()

const enhancer = compose(
  applyMiddleware(thunk)
)

export default function configureStore(rootReducer, preloadedState) {
  const store = createStore(rootReducer, preloadedState, enhancer)
  // sagaMiddleware.run(rootSage)
  return store
}
