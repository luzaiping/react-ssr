import { combineReducers } from 'redux'
import typeUtils from '../utils/typeUtils'
import { i18nReducer } from './i18n'

const REDUCER_KEY = {
  I18N: 'i18n'
}

export default function translateRootReducer({enableI18n}, rootReducer) {

  if (enableI18n) {
    if (!typeUtils.isObject(rootReducer)) throw new Error('启用国际化，rootReducer 必须是Object类型')
    validate()
    
    return combineReducers({
      ...rootReducer,
      [REDUCER_KEY.I18N]: i18nReducer
    })
  } else {
    if (typeUtils.isObject(rootReducer)) {
      validate()
      return combineReducers(rootReducer)
    }
    return rootReducer
  }

  function validate() {
    for (let key of Object.keys(rootReducer)) {
      if ([REDUCER_KEY.I18N].includes(key)) throw new Error(`rootReducer 不能包含 ${key} 属性`)
      if (!typeUtils.isFunction(rootReducer[key])) throw new Error(`rootReducer 属性 ${key} 对应的值必须是 reducer 函数`)
    }
  }
}
