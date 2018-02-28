import React, { Component, PropTypes } from 'react' 
import { Provider } from 'react-redux'
import { Router } from 'react-router'

export default class  Root extends Component {

  render() {
    let { store, routes, history } = this.props

    return (
      <Provider store={store}>
        <Router routes={routes} history={history}/>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object,
  routes: PropTypes.object,
  history: PropTypes.object
}

