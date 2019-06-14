import request from '@/utils/request'
import qs from 'qs'

//镜像查询数据
export const selectMirring = (selectData) => {
    return new Promise((resolve,reject) =>{
        request({
            method:'post',
            url:'wlsbgl/image/getAllImage',
            data: qs.stringify(selectData)  //将传递的参数变为字符形式
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
//删除镜像
export const delDevice = (delData) => {
    return new Promise((resolve, reject) => {
        request({
            method:'post',
            url:'wlsbgl/image/deleteImage',
            data: qs.stringify(delData)  //将传递的参数变为字符形式
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
//应用新增
export const applyAdd = (applyAddData) => {
    return new Promise((resolve,reject) =>{
        request({
            method:'post',
            url:'wlsbgl/app/addApp',
            data: qs.stringify(applyAddData)  //将传递的参数变为字符形式
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
//应用查询数据
export const applySelectapply = (applySelectData) => {
    return new Promise((resolve,reject) =>{
        request({
            method:'post',
            url:'wlsbgl/app/selectAppAndImage',
            data: qs.stringify(applySelectData)  //将传递的参数变为字符形式
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
//删除应用
export const delApplyDevice = (delData) => {
    return new Promise((resolve, reject) => {
        request({
            method:'post',
            url:'wlsbgl/app/deleteApp',
            data: qs.stringify(delData)  //将传递的参数变为字符形式
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