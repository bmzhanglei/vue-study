
import https from './https'

export const userLogin = data => {
    return https.request({
      url: '/api/login',
      data: data,
      method: 'post',
      cancelToken: null, // 避免被加入cancel队列
    })
}

export const userInfo = params => {
    return https.request({
      url: '/api/userInfo',
      params: params,
      method: 'get' 
    })
}

export const getUsers = users => {
    return https.request({
      url: '/api/getUsers',
      params: users,
      method: 'get' 
    })
}
