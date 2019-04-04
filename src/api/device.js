import request from '@/utils/request'
import qs from 'qs'

export const getDeviceData = (devicesj) => {
  return new Promise((resolve, reject) => {
      request({
          method:'post',
          url:'wlsbgl/device/getAllDevice',
          data: qs.stringify(devicesj)  //将传递的参数变为字符形式
        })
         .then((res) => {
             console.log(res.data.data);
             resolve(res.data)
         })
         .catch((err) => {
             console.log(err);
             reject(err)
         })
  })
}

