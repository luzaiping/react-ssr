import { SET_LOCALE, SET_LOCALE_MESSAGE } from './i18nConstants'

/*
 * action creators
 */
/**
 * 设置当前使用的语言, 格式是 zh, zh-CN, en, en-US 这样的形式
 * @param {String} locale 
 */
export function setLocale(locale) {
  return { type: SET_LOCALE, locale }
}

/**
 * 
 * @param {Object} locale  
 */
export function setLocaleMessage({ locale,  message }) {
  return { type: SET_LOCALE_MESSAGE, locale, message }
}
