import { App } from '../../../src'

import routes from '../app/routes'
import rootReducer from '../app/reducer'

import config from '../config'

App.start({ routes, rootReducer, config })
