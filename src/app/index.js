import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { browserHistory/* , hashHistory */ } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from '../common/store/configureStore'
import Root from './root'

function start({ routes, rootReducer, rootId = 'root' }) {

  // Grab the state from a global variable injected into the server-generated HTML
  const preloadedState = window.__PRE_LOADED_STATE__
  delete window.__PRE_LOADED_STATE__
  
  // create redux store with initial state
  const store = configureStore(rootReducer, browserHistory, preloadedState)
  
  // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(browserHistory, store)
  
  // 运行saga
  // runSaga()
  
  render(
    <Root store={store} routes={routes} history={history}/>,
    document.getElementById(rootId)
  )
}

export default { start }
