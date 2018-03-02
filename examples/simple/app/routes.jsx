import React from 'react'
import { Route, IndexRoute } from 'react-router'

// Components
import List from './container/list'
import Layout from './container/layout'
import Test from './components/test'

export default (
  <Route path='/' component={Layout}>
    <IndexRoute component={List} />
    <Route path='test' component={Test} />
  </Route>
)
