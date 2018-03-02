
import { SET_LANGUAGE, PAYLOAD } from '../constants/actionConstants'
import { createAction } from '../utils/actionUtils'

const setLanguage = createAction(SET_LANGUAGE, PAYLOAD)

export default {
  setLanguage
}
