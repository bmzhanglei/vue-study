
import https from './https'

export const getRoles = data => {
    return https.request({
      url: '/api/getRoles',
      params: params,
      method: 'post'   
    })
}

export const delRole = id => {
    return https.request({
      url: '/api/deleteRoles',
      data: {id},
      method: 'post' 
    })
}

export const updateRole = (id,data) => {
    return https.request({
      url: '/api/updateRole/'+id,
      data:data,
      method: 'post' 
    })
}

export const createRole = (role) => {
    return https.request({
      url: '/api/createRole/',
      data:role,
      method: 'post' 
    })
}
