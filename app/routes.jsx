import React from 'react'
import { Route, IndexRoute } from 'react-router'

// Components
import App from './container/app'
import Layout from './components/layout'
import Test from './components/test'

export default (
  <Route path='/' component={Layout}>
    <IndexRoute component={App} />
    <Route path='test' component={Test} />
  </Route>
)
