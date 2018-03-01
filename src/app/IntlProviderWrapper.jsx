import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {addLocaleData, IntlProvider} from 'react-intl'
import typeUtils from '../utils/typeUtils'

const DEFAULT_LOCALE = 'zh'

// 进行 polyfill 国际化
// 动态加载所需的 locale data
function setupIntl(supportedLocales = []) {

  setupPolyfill()
  loadLocaleData()

  function setupPolyfill() {
    let areIntlLocalesSupported = require('intl-locales-supported')

    if (global.Intl) {
      // Determine if the built-in `Intl` has the locale data we need.
      if (!areIntlLocalesSupported(supportedLocales)) {
        // `Intl` exists, but it doesn't have the data we need, so load the
        // polyfill and replace the constructors with need with the polyfill's.
        let IntlPolyfill = require('intl')
        Intl.NumberFormat   = IntlPolyfill.NumberFormat
        Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat
      }
    } else {
      // No `Intl`, so use and load the polyfill.
      global.Intl = require('intl')
    }
  }

  function loadLocaleData() {
    for (let item of supportedLocales) {
      if (!typeUtils.isString(item)) throw new Error('supportedLocales 的元素必须是字符串')
      if (item && item.trim()) {
        let localeData = require(`react-intl/locale-data/${item}`)
        addLocaleData(localeData)
        // 采用 import 动态加载，在 webpack 构建的时候，会将 import 内容输出成单独的 chunk
        // 更关键的是，构建的时候 item 变量还没有值，webpack 最终会将 'react-intl/locale-data' 文件夹
        // 下所有文件都输出成 chunk。下面这样的实现方式无法满足运行时动态加载文件的需求。
        // import(`react-intl/locale-data/${item}`).then(localeData => {
        //   console.log('localeData:', localeData)
        //   addLocaleData(localeData)
        // })
      }
    }
    supportedLocales.includes(DEFAULT_LOCALE) && addLocaleData({ locale: 'zh-CN', parentLocale: DEFAULT_LOCALE })
  }
}

class IntlProviderWrapper extends Component {

  constructor(props) {
    super(props)

    let { supportedLocales = [] } = props.i18nConfig
    setupIntl(supportedLocales)
  }

  render() {
    let { initLocale = '', messages = {} } = this.props.i18nConfig
    let locale = this.props.locale || initLocale || DEFAULT_LOCALE

    return (
      <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
        { this.props.children }
      </IntlProvider>
    )
  }
}

IntlProviderWrapper.propTypes = {
  locale: PropTypes.string,
  i18nConfig: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
}

const mapStateToProps = state => ({
  locale : state.locale || (state.global && state.global.locale)
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(IntlProviderWrapper)
