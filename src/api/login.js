import request from '@/utils/request'
import qs from 'qs'

export function login(logindata) {
  return new Promise ((resolve,reject) => {
    request({
      method: 'post',
      url:'NMPWgcgk/Login!login.action', 
      data: qs.stringify(logindata)
    }).then((val) => {
      resolve(val.data)
    }).catch((err) => {
       reject(err)
    })
  })
}

