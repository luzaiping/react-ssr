
export default (state = { number: 1, items: ['FJ'] }, action) => {
  switch (action.type) {
  case 'INCREMENT':
    return {
      number: state.number + 1,
      items: [
        ...state.items,
        'XM'
      ]
    }
  case 'DECREMENT':
    return {
      number: state.number - 1,
      items: state.items.slice(0, state.items.length - 1)
    }
  default:
    return state
  }
}
