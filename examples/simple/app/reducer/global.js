import { SET_LOCALE } from '../constants/actionConstants'

export default (state = { locale: '' }, action) => {
  case SET_LOCALE: {
    let 
    return {
      ...state,
      fetching: true
    }
  }
  case GET_DATA.SUCCESS: {
    let { payload = [] } = action
    return {
      fetching: false,
      count: payload.length,
      items: payload
    }
  }
  default:
    return state
  }
}
