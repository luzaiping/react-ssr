import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import { i18n } from '../../config'

let root = {
  counter,
  routing: routerReducer
}

// 如果开启国际化功能，这边必须返回对象；如果不使用国际化，返回对象或者combineReducers包装后的函数都可以
export default (i18n.enableI18n ? root : combineReducers(root))
