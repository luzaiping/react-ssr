import 'babel-polyfill'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { match, RouterContext, createMemoryHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from 'app/routes'
import configureStore from 'app/store/configureStore'


/**
 * @param {String} template 模板文件的内容
 * @param {Object} model 包含匹配的路由、渲染组件所需的初始数据
 * @param {String} messages 国际化数据
 * @returns {Promise} 返回路由匹配结果的promise
 */
export function render(template, model/* , messages */) {

  let { query = {} } = model
  let location = query.route

  const memoryHistory = createMemoryHistory(`/${location}`)

  // 构建创始的 redux store
  let store = configureStore(memoryHistory)
  const history = syncHistoryWithStore(memoryHistory, store)

  return new Promise((resolve, reject) => {
    /* react router match history */
    // match({ history, routes, location: req.url },
    match({ history, routes, location }, (err, redirectLocation, renderProps) => {

      if (err) {
        console.error('============= match 500 ===================')
        err.code = 500
        reject(err)
      } else if (redirectLocation) {
        resolve({ code: 302, redirectLocation })
      } else if (renderProps) {
        // TODO 如果 handleRouter 是返回 Promise.reject，那么这边 通过 resolve 调用，是否合理？
        resolve(handleRouter(template, renderProps, store, history))
      } else {
        console.error('============= match 400 ===================')
        let error = new Error(`route: ${location} can not match any page!`)
        error.code = 400
        reject(error)
      }
    })
  })
}

/**
 * 路由匹配的处理：
 * 1、创建初始 redux store
 * 2、调用 renderToString 生成匹配路由 component 的 html 内容
 * 3、
 * @param {*} renderProps
 * @returns {Promise} 路由处理的结果，封装成Promise对象
 */
function handleRouter(template, renderProps, store, history) {

  return fetchData()
    .then( () => {
      // 这边的 store 已经包含了初始数据
      let preloadedState = store.getState()

      // 基于 preloadedState 更新 store，下面这句是否需要
      store = configureStore(history, preloadedState)

      // renderToString 生成匹配路由组件的 html 内容
      // RouterContext 需由 Provider 包装起来，这样组件才能获取到 redux store
      const rootContent = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      )

      // 构建完整的html内容
      let html = template
        .replace('SSR_ROOT_CONTENT', rootContent)
        .replace('SSR_PRE_LOADED_STATE', JSON.stringify(preloadedState).replace(/</g, '\\u003c'))

      return { html }
    })
    .catch(function (error) {
      console.error('============= fetch data error ===================', error)
      return Promise.reject(error)
    })

  /**
   * 获取匹配路由的组件，如果组件有静态的 fetchData 方法，则调用该方法获取初始数据
   */
  function fetchData() {
    let { location = {}, components = [] } = renderProps

    return new Promise( (resolve) => {
      // 获取最后一个 component，如果 component 使用 react-redux connect 包装起来，则返回对应的 WrappedComponent，否则返回当前component
      let lastComponent = components[components.length - 1]
      let component = lastComponent.WrappedComponent || lastComponent // 这边要区分是smart component 还是 dump component

      // 异步action请求成功后，resolve promise
      resolve( component.fetchData ? store.dispatch(component.fetchData(location)) : {} )
    })
  }
}

if (process.env.NODE_ENV === 'production') {
  global.render = render
}
