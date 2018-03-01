import { SET_LOCALE } from '../constants/actionConstants'

export default (state = { locale: 'zh' }, action) => {
  switch (action.type) {
  case SET_LOCALE: {
    let { payload = {} } = action
    return {
      ...state,
      locale: payload.locale
    }
  }
  default:
    return state
  }
}
