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