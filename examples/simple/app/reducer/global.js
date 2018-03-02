import { SET_LANGUAGE } from '../constants/actionConstants'

export default (state = { language: 'zh' }, action) => {
  switch (action.type) {
  case SET_LANGUAGE: {
    let { language } = action.payload
    return {
      ...state,
      language
    }
  }
  default:
    return state
  }
}
