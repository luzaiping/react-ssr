import { createStore, applyMiddleware, compose } from 'redux'
// import { reduxReactRouter } from 'redux-router'
// import createHistory from 'history/lib/createHashHistory'
import thunk from 'redux-thunk'
// import createLogger from 'redux-logger'

// import getRoutes from '../routes'
// import rootReducer from '../reducers'
// import createSagaMiddleware from 'redux-saga'
// import rootSage from '../saga/rootSaga'
import DevTools from './devTools'

// const sagaMiddleware = createSagaMiddleware()

const enhancer = compose(
  applyMiddleware(thunk),
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
