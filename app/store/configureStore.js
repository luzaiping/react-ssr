
let configureFileName = ['production', 'beat'].includes(process.env.NODE_ENV) ? 'configureStore.prod' : 'configureStore.dev'
module.exports = require(`./${configureFileName}`)
