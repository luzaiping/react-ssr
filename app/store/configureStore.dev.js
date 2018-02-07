import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'
import reduxLogger from 'redux-logger'
// import routerMiddleware from 'react-router-redux/lib/middleware'
// import createSagaMiddleware from 'redux-saga'
// import rootSage from '../saga/rootSaga'
import DevTools from './devTools'

// const sagaMiddleware = createSagaMiddleware()

const enhancer = compose(
  applyMiddleware(reduxThunk, reduxLogger),
  global.devToolsExtension ? global.devToolsExtension() : DevTools.instrument()
)

export default function configureStore(rootReducer, preloadedState) {
  const store = createStore(rootReducer, preloadedState, enhancer)
  // sagaMiddleware.run(rootSage)
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
