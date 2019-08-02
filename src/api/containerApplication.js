import request from '@/utils/request'
import qs from 'qs'

//部署管理应用部署新增应用
export const addNewApply= (addNewApplyData) => {
    return new Promise((resolve,reject) =>{
        request({
            method:'post',
            url:' /wlsbgl/container/addContainer',
            data: qs.stringify(addNewApplyData)  //将传递的参数变为字符形式
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

//部署管理页面查询数据
export const selectDeploy= (deploySelectData) => {
    return new Promise((resolve,reject) =>{
        request({
            method:'post',
            url:'/wlsbgl/host/getAllHostDevice',
            data: qs.stringify(deploySelectData)  //将传递的参数变为字符形式
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
  //已经编排的应用
export const arrangeYes = (yesData) => {
    return new Promise((resolve, reject) => {
        request({
            method:'post',
            url:'/wlsbgl/container/arrangeYes',
            data: qs.stringify(yesData)  //将传递的参数变为字符形式
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
    //独立的应用
export const arrangeNo = (noData) => { 
    return new Promise((resolve, reject) => {
        request({
            method:'post',
            url:'/wlsbgl/container/arrangeNo',
            data: qs.stringify(noData)  //将传递的参数变为字符形式
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
  //把独立应用设置为编排应用 把编排应用设置为独立应用
  export const arrangeChange = (changeData) => { 
    return new Promise((resolve, reject) => {
        request({
            method:'post',
            url:'/wlsbgl/container/arrangeAndOne',
            data: qs.stringify(changeData)  //将传递的参数变为字符形式
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
//向上移动
export const arrangeUp = (upData) => { 
    return new Promise((resolve, reject) => {
        request({
            method:'post',
            url:'/wlsbgl/container/lookUpContainer',
            data: qs.stringify(upData)  //将传递的参数变为字符形式
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
  //向xia移动
export const arrangeDown = (downData) => { 
    return new Promise((resolve, reject) => {
        request({
            method:'post',
            url:'/wlsbgl/container/lookDownContainer',
            data: qs.stringify(downData)  //将传递的参数变为字符形式
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