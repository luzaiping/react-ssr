import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import template from './template'
import counter from '../app/reducer/counter'
import App from '../app/container/app'

export default function render(req, res) {

    // 每个请求都创建一个store
    const store = createStore(counter)

    // renderToString 获取组件的 html 内容
    const rootContent = renderToString(
        <Provider store={store}>
            <App />
        </Provider>
    )
    
    const preLoadedState = store.getState()

    // 构建完整的response内容
    const html = template({
        rootContent,
        title: 'FROM THE SERVER',
        preLoadedState
    })

    res.send(html)
}
