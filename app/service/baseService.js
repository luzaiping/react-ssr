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
  
  console.log('============= baseService:' + url)
  
  return fetch(url, setting)
    .then(response => {
      console.log('============= get response ============')
      let json = response.json()
      return json.then(json => {
        console.log('============= response ============', json)
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
      console.log('============= fetch error ===== ', e)
      return Promise.reject(e)
    })
}
