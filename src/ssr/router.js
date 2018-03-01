import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { RouterContext } from 'react-router'
import defaultConfig from '../config/config'
import Root from '../app/Root'

/**
 * 路由匹配的处理：
 * 1、创建初始 redux store
 * 2、调用 renderToString 生成匹配路由 component 的 html 内容
 * @param {*} renderProps
 * @returns {Promise} 路由处理的结果，封装成Promise对象
 */
export function handleRouter(template, renderProps, store, config = {}) {

  return fetchData(renderProps, store)
    .then( () => {
      // 这边的 store 已经包含了初始数据
      let preloadedState = store.getState()
      let composedConfig = { ...defaultConfig, ...config }

      // TODO 基于 preloadedState 更新 store，下面这句是否需要？
      //store = configureStore(rootReducer, history, preloadedState)

      // renderToString 生成匹配路由组件的 html 内容
      // RouterContext 需由 Provider 包装起来，这样组件才能获取到 redux store
      const rootContent = renderToString(
        <Provider store={store}>
          <Root i18nConfig={composedConfig.i18n}>
            <RouterContext {...renderProps} />
          </Root>
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
}
  
/**
 * 获取匹配路由的组件，如果组件有静态的 fetchData 方法，则调用该方法获取初始数据
 */
function fetchData(renderProps, store) {
  let { location = {}, components = [] } = renderProps

  return new Promise( (resolve) => {
    // 获取最后一个 component，如果 component 使用 react-redux connect 包装起来，则返回对应的 WrappedComponent，否则返回当前component
    let lastComponent = components[components.length - 1]
    let component = lastComponent.WrappedComponent || lastComponent // 这边要区分是smart component 还是 dump component

    // 异步action请求成功后，resolve promise
    resolve( component.fetchData ? store.dispatch(component.fetchData(location)) : {} )
  })
}
