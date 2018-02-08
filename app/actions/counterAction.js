
import { INCREMENT, DECREMENT, GET_DATA, PAYLOAD } from 'constants/actionConstants'
import { createAction } from 'utils/actionUtils'

const increment = createAction(INCREMENT)
const decrement = createAction(DECREMENT)
const getData = createAction(GET_DATA.REQUEST, PAYLOAD)

export default {
  increment,
  decrement,
  getData
}
