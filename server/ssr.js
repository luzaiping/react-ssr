import React from 'react'
// import { createStore } from 'redux'
import { renderToString } from 'react-dom/server'
import template from './template'

import rootReducer from '../app/reducer'
import Root from '../app/root'
import configureStore from '../app/store/configureStore'

export default function render(req, res) {

  // const store = createStore(rootReducer)
  const store = configureStore(rootReducer)

  // renderToString 获取组件的 html 内容
  const rootContent = renderToString( <Root store={store}/> )

  const preLoadedState = store.getState()

  // 构建完整的response内容
  const html = template({
    rootContent,
    title: 'FROM THE SERVER',
    preLoadedState
  })

  res.send(html)
}
