import { request } from './baseService'

class UserService {
  
  getData() {
    let url = 'http://localhost:4000/api/getData'
    return request(url)
  }
}

export default new UserService()
