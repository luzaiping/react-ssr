import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'

import template from './template'

import routes from '../app/routes'
import rootReducer from '../app/reducer'
import configureStore from '../app/store/configureStore'
import { Provider } from 'react-redux'

function handleError(res, err) {
  res.status(500).send(err.message)
}

function handleNotFound(res) {
  res.status(400).send('Not Found')
}

function handleRedirect(res, redirect) {
  res.redirect(302, redirect.pathname + redirect.search)
}

function handleRouter(res, props) {

  // 构建创始的 redux store， initState 是可选，根据实际需要进行调整，大部分项目都不需要
  let initState = { counter: {number: 3, items: ['FJ', 'XM', 'SM'] }}
  const store = configureStore(rootReducer, initState)

  // renderToString 获取组件的 html 内容
  // 
  const rootContent = renderToString(
    <Provider store={store}>
      <RouterContext {...props} />
    </Provider>
  )
  
  const preloadedState = store.getState()

  // 构建完整的response内容
  const html = template({
    rootContent,
    title: 'FROM THE SERVER',
    preloadedState
  })
  
  res.status(200).send(html)
}

export function isoMiddleware(req, res) {
  match({ routes, location: req.url }, 
    (err, redirect, props) => {
      if (err) handleError(res, err)
      else if (redirect) handleRedirect(res, redirect)
      else if (props) handleRouter(res, props)
      else handleNotFound(res)
    })
}
