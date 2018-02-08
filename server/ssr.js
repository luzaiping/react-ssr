import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'

import template from './template'

import routes from '../app/routes'
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

/**
 * 路由匹配的处理：
 * 1、创建初始 redux store
 * 2、调用 renderToString 生成匹配路由 component 的 html 内容
 * 3、
 * @param {*} res 
 * @param {*} props 
 */
function handleRouter(res, props) {

  // 构建创始的 redux store
  let store = configureStore()

  fetchData()
    .then( () => {
      
      console.log('fetchData success.....')
      
      // 得到请求数据后的state
      let preloadedState = store.getState()
      console.log('preloadedState:', preloadedState)
      
      store =  configureStore(preloadedState)

      // renderToString 生成匹配路由组件的 html 内容
      // RouterContext 需由 Provider 包装起来，这样组件才能获取到 redux store
      const rootContent = renderToString(
        <Provider store={store}>
          <RouterContext {...props} />
        </Provider>
      )
    
      // 构建完整的response内容
      const html = template({
        rootContent,
        title: 'FROM THE SERVER',
        preloadedState
      })
    
      res.status(200).send(html)
    })
    .catch(function (error) {
      console.log(error.stack)
    })

  function fetchData() {
    let { params,  components = [] } = props
    return new Promise(function (resolve) {
      let comp = components[components.length - 1].WrappedComponent
      resolve(comp.fetchData ? comp.fetchData( store, params ) : {})
    })
  }
}

export function ssrMiddleware(req, res) {
  console.log('********************** ssr *****************')
  match({ routes, location: req.url },
    (err, redirect, props) => {
      if (err) handleError(res, err)
      else if (redirect) handleRedirect(res, redirect)
      else if (props) handleRouter(res, props)
      else handleNotFound(res)
    })
}
