import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import routes from './routes'

import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRE_LOADED_STATE__
delete window.__PRE_LOADED_STATE__
// create redux store with initial state
const store = configureStore(preloadedState)

// 移除react-router自动添加的_k=xxx参数
// const hashHistory = useRouterHistory(createHashHistory)({queryKey: false})
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router routes={routes} history={history}/>
  </Provider>,
  document.getElementById('root')
)
