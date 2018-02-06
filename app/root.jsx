
import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import routes from './routes'
import { Router } from 'react-router'

/* let child

if (['production', 'beta', 'debug'].includes(process.env.NODE_ENV)) {
  child = <App />
} else {
  let DevTools = require('./store/devTools').default // SSR 不启用 devTools，要用 devToolsExtension
  child = (
    <div>
      <App />
      <DevTools />
    </div>
  )
} */
{/* <Provider store={store}>
<Router routes={routes} history={browserHistory}/>
  <Router routes={routes} history={browserHistory}/>
</Provider> */}

export default class Root extends Component {
  static displayName = 'Root'
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  render() {
    const { store } = this.props
    return (
      <Provider store={store}>
        <Router routes={routes} history={history}/>
      </Provider>
    )
  }
}

