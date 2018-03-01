import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory/* , hashHistory */ } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from '../common/store/configureStore'
import defaultConfig from '../config/config'
import { getProvider } from './RootProvider'

function start({ routes, rootReducer, rootId = 'root', config = {} }) {

  let composedConfig = { ...defaultConfig, ...config }

  // Grab the state from a global variable injected into the server-generated HTML
  const preloadedState = window.__PRE_LOADED_STATE__
  delete window.__PRE_LOADED_STATE__
  
  // create redux store with initial state
  const store = configureStore(rootReducer, browserHistory, preloadedState)
  
  // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(browserHistory, store)
  
  // 运行saga
  // runSaga()
  
  let RootProvider = getProvider(composedConfig.i18n)

  render(
    <RootProvider store={store} i18nConfig={composedConfig.i18n}>
      <Router routes={routes} history={history}/>
    </RootProvider>,
    document.getElementById(rootId)
  )
}

export default { start }
