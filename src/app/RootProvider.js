import React, { Component, PropTypes } from 'react' 
import { Provider } from 'react-redux'
import {addLocaleData, IntlProvider} from 'react-intl'
import typeUtils from '../utils/typeUtils'

const DEFAULT_LOCALE = 'zh'

/**
 * 根据是否启用国际化预先加载国际化的locale data
 * @param {Object} i18nConfig 国际化的配置信息
 * @return {Function} RootProvider
 */
export function getProvider(i18nConfig = {}) {
  let { enableI18n = false, supportedLocales = [] } = i18nConfig

  if (enableI18n) {
    for (let item of supportedLocales) {
      
      if (!typeUtils.isString(item)) throw new Error('supportedLocales 的元素必须是字符串')

      if (item && item.trim()) {
        let localeData = require(`react-intl/locale-data/${item}`)
        addLocaleData(localeData)
      }
    }
    supportedLocales.includes(DEFAULT_LOCALE) && addLocaleData({ locale: 'zh-CN', parentLocale: DEFAULT_LOCALE })
  }

  return RootProvider
}

class RootProvider extends Component {

  render() {
    let { store, i18nConfig = {} } = this.props
    let { enableI18n = false, locale = '', defaultLocale = '', messages = {} } = i18nConfig
    
    return enableI18n ? 
      (
        <Provider store={store}>
          <IntlProvider locale={locale || DEFAULT_LOCALE} defaultLocale={defaultLocale || DEFAULT_LOCALE} messages={messages}>
            { this.props.children }
          </IntlProvider>
        </Provider>
      ) : 
      (
        <Provider store={store}>
          { this.props.children }
        </Provider>
      )
  }
}

RootProvider.propTypes = {
  i18nConfig: PropTypes.object.isRequired,
  store: PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired
  }).isRequired,
  children: PropTypes.element.isRequired
}

