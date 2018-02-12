import { INCREMENT, DECREMENT, GET_DATA } from 'constants/actionConstants'

export default (state = { count: 0, items: [] }, action) => {
  switch (action.type) {
  case INCREMENT:
    return {
      count: state.count + 1,
      items: [
        ...state.items,
        { name: 'XM', quantity: 2 }
      ]
    }
  case DECREMENT:
    return {
      count: state.count - 1,
      items: state.items.slice(0, state.items.length - 1)
    }
  case GET_DATA.REQUEST: {
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
