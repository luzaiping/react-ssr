
import createSagaMiddleware, { takeEvery } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import { GET_DATA } from '../constants/actionConstants'
import { mapPayload } from '../utils/sagaUtils'
import userService from '../service/userService'

export default function* rootSaga() {
  yield [
    takeEvery(GET_DATA.REQUEST, mapPayload(getData))
  ]
}

export const sagaMiddleware = createSagaMiddleware()

export const runSaga = () => {
  return sagaMiddleware.run(rootSaga)
}

export function* getData() {
  try {
    let payload = yield call([ userService, userService.getData ])
    yield put({ type: GET_DATA.SUCCESS, payload })
  } catch(error) {
    yield put({ type: GET_DATA.FAILURE, error })
  }
}
