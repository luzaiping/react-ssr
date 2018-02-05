import { createStore, applyMiddleware, compose } from 'redux'
// import { reduxRouter } from 'redux-router'
// import createHistory from 'history/lib/createHashHistory'

// import getRoutes from '../routes'
import thunk from 'redux-thunk'
// import rootReducer from '../reducers'
// import createSagaMiddleware from 'redux-saga'
// import rootSage from '../saga/rootSaga'

// const sagaMiddleware = createSagaMiddleware()

const enhancer = compose(
  applyMiddleware(thunk)
)

/* const finalCreateStore = compose(
  applyMiddleware(thunk),
  // reduxRouter({ getRoutes, createHistory })
)(createStore) */

export default function configureStore(rootReducer, preloadedState) {
  const store = enhancer(createStore)(rootReducer, preloadedState)
  // sagaMiddleware.run(rootSage)
  return store
}
