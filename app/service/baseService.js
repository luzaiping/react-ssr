import fetch from 'isomorphic-fetch'

export function request(url) {

  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=UTF-8'
  }

  let setting = {
    method: 'GET',
    headers
  }

  return fetch(url, setting)
    .then(response => {
      let json = response.json()
      return json.then(json => {
        return { json, response }
      }).then(({ json, response }) => {
        return response.ok ? json : Promise.reject({...json, statusCode: response.status})
      }).catch(e => {
        if (response.ok) {
          return {}
        } else {
          return Promise.reject(e)
        }
      })
    })
    .catch(e => { // 处理所有fetch请求发送失败的异常，比如无网络连接
      return Promise.reject(e)
    })
}
