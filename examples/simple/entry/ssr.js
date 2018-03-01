import { SSR } from '../../../src/'

import routes from '../app/routes'
import rootReducer from '../app/reducer'
import config from '../config'

const render = SSR.start({ routes, rootReducer, config })

module.exports = render
