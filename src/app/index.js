import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory/* , hashHistory */ } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import configureStore from '../common/store/configureStore'
import defaultConfig from '../config/config'
import translateRootReducer from '../common/translateRootReducer'
import Root from '../common/Root'

function start({ routes, rootReducer, rootId = 'root', config = {} }) {
  
  // Grab the state from a global variable injected into the server-generated HTML
  const preloadedState = window.__PRE_LOADED_STATE__
  delete window.__PRE_LOADED_STATE__
  
  let finalConfig = { ...defaultConfig, ...config }
  let i18nConfig = finalConfig.i18n
  // create redux store with initial state
  const store = configureStore(translateRootReducer(i18nConfig, rootReducer), browserHistory, preloadedState)
  
  // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(browserHistory, store)
  
  // 运行saga
  // runSaga()
  
  render(
    <Provider store={store}>
      <Root i18nConfig={i18nConfig}>
        <Router routes={routes} history={history}/>
      </Root>
    </Provider>,
    document.getElementById(rootId)
  )
}

/**
 * TODO
 * 这边默认将 setLocale 暴露给应用，调用了这个方法会触发一个 type 是SET_LOCALE 的 action
 * 这个方法实际只有启用国际化才需要；如果没有使用国际化又调用这个方法，
 * 由于没有i18n 的reducer 来处理 这个action，所以即使调用了，对应用也没有任何副作用。
 * 还没有想到好的方法可以动态导出module，暂时先这样，后续有时间再研究新的实现方式
 */

export { setLocale } from '../common/i18n'
export default { start }
