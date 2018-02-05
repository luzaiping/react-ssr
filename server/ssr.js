import React from 'react'
import { renderToString } from 'react-dom/server'
import template from './template'

import rootReducer from '../app/reducer'
import Root from '../app/root'
import configureStore from '../app/store/configureStore'

export default function render(req, res) {

  let initState = { counter: {number: 2, items: ['FJ', 'XM'] }}
  
  const store = configureStore(rootReducer, initState)
  
  // renderToString 获取组件的 html 内容
  const rootContent = renderToString( <Root store={store}/> )
  
  const preloadedState = store.getState()

  // 构建完整的response内容
  const html = template({
    rootContent,
    title: 'FROM THE SERVER',
    preloadedState
  })
  
  res.send(html)
}
