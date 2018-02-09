import { INCREMENT, DECREMENT, GET_DATA } from 'constants/actionConstants'

export default (state = { count: 1, items: ['FJ'] }, action) => {
  switch (action.type) {
  case INCREMENT:
    return {
      count: state.count + 1,
      items: [
        ...state.items,
        'XM'
      ]
    }
  case DECREMENT:
    return {
      count: state.count - 1,
      items: state.items.slice(0, state.items.length - 1)
    }
  case GET_DATA.SUCCESS: {
    let { payload = [] } = action
    console.log('============ update reducer ================')
    return {
      count: payload.length,
      items: payload
    }
  }
  default:
    return state
  }
}
