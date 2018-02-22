
import { INCREMENT, DECREMENT, GET_DATA, PAYLOAD } from 'constants/actionConstants'
import { createAction } from 'utils/actionUtils'
import { request } from '../service/baseService'

const increment = createAction(INCREMENT)
const decrement = createAction(DECREMENT)
const getDataRequest = createAction(GET_DATA.REQUEST, PAYLOAD)
const getDataSuccess = createAction(GET_DATA.SUCCESS, PAYLOAD)
// const getData = createAction(GET_DATA.REQUEST, PAYLOAD)

const getData = function (params = {}) {

  return dispatch => {
    dispatch(getDataRequest()) // 触发异步请求的action

    return request('http://192.168.85.22:8081/items')
      .then( response => {
        console.log('get data success:', response)
        dispatch(getDataSuccess(response))
        console.log('dispatch getDataSuccess')
      })
      .catch( err => {
        console.log('get data error:', err)
      })
  }
}

export default {
  increment,
  decrement,
  getData
}
