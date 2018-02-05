
export default (state = { counter: 1, items: ['XM'] }, action) => {
  switch (action.type) {
  case 'INCREMENT':
    return {
      counter: state.counter + 1,
      items: [
        ...state.items,
        'ND'
      ]
    }
  case 'DECREMENT':
    return {
      counter: state.counter - 1,
      items: state.items.slice(0, state.items.length - 1)
    }
  default:
    return state
  }
}
