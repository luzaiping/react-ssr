import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory/* , hashHistory */ } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './store/configureStore'
import { routes, rootReducer } from '../demo/basic'

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
  <Provider store={store}>
    <Router routes={routes} history={history}/>
  </Provider>,
  document.getElementById('root')
)
