import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext, createMemoryHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import template from './template'
import routes from '../app/routes'
import configureStore from '../app/store/configureStore'
import { Provider } from 'react-redux'
import { runSaga } from '../app/saga/rootSaga'

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
function handleRouter(res, props, store, history) {

  // let tasks = runSaga() // 注册 saga

  // console.log(`=========== tasks ====================:`, tasks)

  fetchData()
    .then( () => {
      // 得到请求数据后的state
      let preloadedState = store.getState()
      
      // 基于 preloadedState 更新 store，下面这句是否需要？
      store = configureStore(history, preloadedState)

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
    let { location = {}, components = [] } = props

    return new Promise( (resolve) => {
      // 获取最后一个 component，如果 component 使用 react-redux connect 包装起来，则返回对应的 WrappedComponent，否则返回当前component
      let lastComponent = components[components.length - 1]
      let component = lastComponent.WrappedComponent || lastComponent // 这边要区分是获取哪个component

      resolve( component.fetchData ? store.dispatch(component.fetchData(location)) : {} )

      /* if (component.fetchData) {
        console.log('======= wait for saga resolve ==============')
        // return tasks.done // 返回一个promise
        return Promise.resolve()
      } else {
        // return Promise.resolve({})
      } */
    })

    // return new Promise(function (resolve) {
    //   // resolve(comp.fetchData ? comp.fetchData( store, params ) : {})
    // })
  }
}

export function ssrMiddleware(req, res) {
  const memoryHistory = createMemoryHistory(req.url)
  
  // 构建创始的 redux store
  let store = configureStore(memoryHistory)
  const history = syncHistoryWithStore(memoryHistory, store)

  console.log('req query', req.query)
  
  let location = req.query.r || '/'
  
  console.log('location', location)
  
  /* react router match history */
  // match({ history, routes, location: req.url },
  match({ history, routes, location },
    (err, redirect, props) => {
      if (err) handleError(res, err)
      else if (redirect) handleRedirect(res, redirect)
      else if (props) handleRouter(res, props, store, history)
      else handleNotFound(res)
    })
}
