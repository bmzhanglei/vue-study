
import https from './https'

export const getIp = () => {
    return https.request({
      url: '/ip',
      method: 'get',
    //   cancelToken: null, // 避免被加入cancel队列
    })
  }