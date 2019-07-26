import request from '@/utils/request'
import qs from 'qs'
export const getDeviceNumData = (time) => {
  return new Promise((resolve, reject) => {
      request({
          method:'post',
          url:'/wlsbgl/index/DeviceNum',
          data: qs.stringify(time)  //将传递的参数变为字符形式
        })
         .then((res) => {
            //  console.log(res.data.data);
             resolve(res.data)
         })
         .catch((err) => {
             console.log(err);
             reject(err)
         })
  })
}
export const getDeviceTypeData = (time) => {
    return new Promise((resolve, reject) => {
        request({
            method:'post',
            url:'/wlsbgl/index/DeviceNumtype',
            data: qs.stringify(time)  //将传递的参数变为字符形式
          })
           .then((res) => {
              //  console.log(res.data.data);
               resolve(res.data)
           })
           .catch((err) => {
               console.log(err);
               reject(err)
           })
    })
  }