import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'
import reduxLogger from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
// import { sagaMiddleware } from '../saga/rootSaga'
import rootReducer from '../reducer'

function createEnhancer(history) {
  let enhancer

  if (process.env.CLIENT) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    enhancer = composeEnhancers(
      // applyMiddleware(reduxThunk, routerMiddleware(history), sagaMiddleware),
      applyMiddleware(reduxThunk, routerMiddleware(history), reduxLogger)
    )
  } else {
    enhancer = compose(
      // applyMiddleware(reduxThunk, routerMiddleware(history), sagaMiddleware),
      applyMiddleware(reduxThunk, routerMiddleware(history))
    )
  }

  return enhancer
}


export default function configureStore(history, preloadedState) {

  const store = createStore(rootReducer, preloadedState, createEnhancer(history))

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }
  
  return store
}
