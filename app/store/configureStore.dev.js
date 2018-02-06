import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
// import { reduxReactRouter } from 'redux-router'
// import createHistory from 'history/lib/createHashHistory'
import thunk from 'redux-thunk'
// import createLogger from 'redux-logger'

// import getRoutes from '../routes'
// import rootReducer from '../reducers'
// import createSagaMiddleware from 'redux-saga'
// import rootSage from '../saga/rootSaga'
// import {hashHistory} from 'react-router'
// import { routerReducer } from 'react-router-redux'
// import routerMiddleware from 'react-router-redux/lib/middleware'
import DevTools from './devTools'
import reducer from '../reducer'
import { routerReducer } from 'react-router-redux'

// const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  ...reducer,
  routing: routerReducer
})

const enhancer = compose(
  applyMiddleware(thunk),
  global.devToolsExtension ? global.devToolsExtension() : DevTools.instrument()
)

export default function configureStore(preloadedState) {
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
