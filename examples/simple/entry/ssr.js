import { SSR } from '../../../ssr-core/'

import routes from '../app/routes'
import rootReducer from '../app/reducer'

const render = SSR.start({ routes, rootReducer })

module.exports = render
