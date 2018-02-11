import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'
import reduxLogger from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import { sagaMiddleware, runSaga } from '../saga/rootSaga'
import DevTools from './devTools'
import rootReducer from '../reducer'
import createSagaMiddleware from 'redux-saga'

export default function configureStore(history, preloadedState) {

  // const sagaMiddleware = createSagaMiddleware()

  const enhancer = compose(
    // applyMiddleware(reduxThunk, routerMiddleware(history), sagaMiddleware),
    applyMiddleware(reduxThunk, routerMiddleware(history)),
    global.devToolsExtension ? global.devToolsExtension() : DevTools.instrument()
  )

  const store = createStore(rootReducer, preloadedState, enhancer)

  // runSaga()
  // sagaMiddleware.run(rootSaga) // 运行 saga tasks

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }
  
  return store
}
