import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
// import { reduxRouter } from 'redux-router'
// import createHistory from 'history/lib/createHashHistory'

// import getRoutes from '../routes'
import thunk from 'redux-thunk'
import reducer from '../reducer'
import { routerReducer } from 'react-router-redux'
// import rootReducer from '../reducers'
// import createSagaMiddleware from 'redux-saga'
// import rootSage from '../saga/rootSaga'

// const sagaMiddleware = createSagaMiddleware()

const enhancer = compose(
  applyMiddleware(thunk)
)

const rootReducer = combineReducers({
  ...reducer,
  routing: routerReducer
})

export default function configureStore(preloadedState) {
  const store = createStore(rootReducer, preloadedState, enhancer)
  // sagaMiddleware.run(rootSage)
  return store
}
