import { PAYLOAD } from '../constants/actionConstants'

/**
 * 提取action.payload
 * saga层直接接触参数,便于saga复用
 * @param func
 * @returns {mapFunc}
 */
export function mapPayload(func) {
  return function* mapFunc(action) {
    return yield func.call(this, action[PAYLOAD])
  }
}
