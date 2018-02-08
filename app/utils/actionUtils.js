/**
 * 创建action减少模版代码.
 * @param type  actionType
 * @param argNames 所有附带数据的属性名称
 * @returns {{ type: *, ... }}
 */
export function createAction(type, ...argNames) {
  return (...args) => {
    let action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}

/**
 * 创建actionConstant对象，包含REQUEST，SUCCESS，FAILURE
 * @param type XX
 * @returns {{REQUEST: string, SUCCESS: string, FAILURE: string}}
 */
export function createAsyncActionType(type) {
  return {
    REQUEST: `${type}_REQUEST`,
    SUCCESS: `${type}_SUCCESS`,
    FAILURE: `${type}_FAILURE`
  }
}
