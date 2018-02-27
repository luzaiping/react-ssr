import { App } from '../../../ssr-core/'

import routes from '../app/routes'
import rootReducer from '../app/reducer'

App.start({ routes, rootReducer })
