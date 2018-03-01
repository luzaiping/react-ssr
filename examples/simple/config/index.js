module.exports = {
  hasHash: true, // 是否使用 hash
  host: 'localhost:4000', // loader 里需要用到的 SSR 请求地址
  title: 'SSR Demo',
  i18n: {
    enableI18n: true, // 
    initLocale: 'zh', // 当前使用的语言
    supportedLocales: [ 'zh', 'en' ], // 支持的语言
    messages: {
      zh: require('../locale-data/zh.json'),
      en: require('../locale-data/en.json')
    }
  }
}
