import request from '@/utils/request'
import qs from 'qs'
//获取所有设备  以及树需要
export const getDeviceData = (devicesj) => {
  return new Promise((resolve, reject) => {
      request({
          method:'post',
          url:'wlsbgl/device/getAllDevice',
          data: qs.stringify(devicesj)  //将传递的参数变为字符形式
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
//查询设备
export const selectDevice = (seldevicesj) => {
    return new Promise((resolve, reject) => {
        request({
            method:'post',
            url:'wlsbgl/device/getDeviceAndGroup',
            data: qs.stringify(seldevicesj)  //将传递的参数变为字符形式
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
//添加设备
export const addDevice = (addData) => {
    return new Promise((resolve, reject) => {
        request({
            method:'post',
            url:'wlsbgl/device/addDevice',
            data: qs.stringify(addData)  //将传递的参数变为字符形式
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
//删除设备
export const delDevice = (delData) => {
    return new Promise((resolve, reject) => {
        request({
            method:'post',
            url:'wlsbgl/device/deleteDevice',
            data: qs.stringify(delData)  //将传递的参数变为字符形式
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
//修改设备
export const updateDevice = (updateData) => {
    return new Promise((resolve, reject) => {
        request({
            method:'post',
            url:'wlsbgl/device/updateDevice',
            data: qs.stringify(updateData)  //将传递的参数变为字符形式
          })
           .then((res) => {
               resolve(res.data)
           })
           .catch((err) => {
               console.log(err);
               reject(err)
           })
    })
  }
//获取对应的分组
export const getGroup = () => {
    return new Promise((resolve, reject) => {
        request({
            method:'post',
            url:'wlsbgl/deviceGroup/getAllDeviceGroup',
          })
           .then((res) => {
               resolve(res.data)
           })
           .catch((err) => {
               console.log(err);
               reject(err)
           })
    })
  }
//添加分组
export const addGroup = (addGroupdata) => {
    return new Promise((resolve, reject) => {
        request({
            method:'post',
            url:'wlsbgl/deviceGroup/addDeviceGroups',
            data: qs.stringify(addGroupdata)  //将传递的参数变为字符形式
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
//删除分组
export const deleteGroup = (delGroupData) =>{
    return new Promise((resolve,reject) =>{
        request({
            method:'post',
            url:'/wlsbgl/deviceGroup/deleteDeviceGroup',
            data: qs.stringify(delGroupData)  //将传递的参数变为字符形式
          })
           .then((res) => {
               resolve(res.data)
           })
           .catch((err) => {
               console.log(err);
               reject(err)
           })
    })
}
//设备启动暂停接口
export const deviceStartAndClose = (startClose) =>{
    return new Promise((resolve,reject) =>{
        request({
            method:'post',
            url:'/wlsbgl/device/updateDeviceStatus',
            data: qs.stringify(startClose)  //将传递的参数变为字符形式
          })
           .then((res) => {
               resolve(res.data)
           })
           .catch((err) => {
               console.log(err);
               reject(err)
           })
    })
}
//批量设备启动暂停接口
export const batchDeviceStartAndClose = ( batchStartClose) =>{
    return new Promise((resolve,reject) =>{
        request({
            method:'post',
            url:'/wlsbgl/device/updateDeviceStatusAll',
            data: qs.stringify(batchStartClose)  //将传递的参数变为字符形式
          })
           .then((res) => {
               resolve(res.data)
           })
           .catch((err) => {
               console.log(err);
               reject(err)
           })
    })
}