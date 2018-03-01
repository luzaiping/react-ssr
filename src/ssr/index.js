import 'babel-polyfill'
import { match, createMemoryHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from '../common/store/configureStore'
import { handleRouter } from './router'

function start({ routes, rootReducer, config = {} }) {

  // 将 render 暴露到 global scope 供 j2v8 调用
  // TODO j2v8 研究下是否可以直接调用 export 出去的方法
  if (process.env.NODE_ENV === 'production') {
    global.render = render
  }

  return render
  
  /**
   * @param {String} template 模板文件的内容
   * @param {Object} model 包含匹配的路由、渲染组件所需的初始数据
   * @param {String} messages 国际化数据
   * @returns {Promise} 返回路由匹配结果的promise
   */
  function render(template, model/* , messages */) {
    
    let { query = {} } = model
    let location = query.route

    const memoryHistory = createMemoryHistory(`/${location}`)
    // 构建创始的 redux store
    let store = configureStore(rootReducer, memoryHistory)
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
          resolve(handleRouter(template, renderProps, store, config))
        } else {
          console.error('============= match 404 ===================')
          let error = new Error(`route: ${location} can not match any page!`)
          error.code = 404
          reject(error)
        }
      })
    })
  }
}

export default { start }
