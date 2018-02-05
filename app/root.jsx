
import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import App from './container/app'

/* let child

if (['production', 'beta', 'debug'].includes(process.env.NODE_ENV)) {
  child = <App />
} else {
  let DevTools = require('./store/devTools').default
  child = (
    <div>
      <App />
      <DevTools />
    </div>
  )
} */

export default class Root extends Component {
  static displayName = 'Root'
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  render() {
    const { store } = this.props
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

