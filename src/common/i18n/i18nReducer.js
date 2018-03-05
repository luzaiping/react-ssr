import { SET_LOCALE, SET_LOCALE_MESSAGE } from './i18nConstants'
import { i18n } from '../../config/config'

export default (state = { locale: i18n.initialLocale }, action) => {
  switch (action.type) {
  case SET_LOCALE: {
    let { locale } = action
    return {
      ...state,
      locale
    }
  }
  case SET_LOCALE_MESSAGE: {
    let { locale, message } = action
    return {
      ...state,
      messages: {
        ...state.message,
        [locale]: message
      }
    }
  }
  default:
    return state
  }
}
