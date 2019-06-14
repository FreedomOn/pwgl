import request from '@/utils/request'
import qs from 'qs'

//查询所有用户
export const selectUser = (selectData) => {
    return new Promise((resolve,reject) =>{
        request({
            method:'post',
            url:'/wlsbgl/user/getAll',
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
//用户添加接口
export const addUser = (addData) => {
    return new Promise((resolve,reject) =>{
        request({
            method:'post',
            url:'/wlsbgl/user/addUser',
            data: qs.stringify(addData)  //将传递的参数变为字符形式
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
//用户删除接口
export const delUser = (delData) => {
    return new Promise((resolve,reject) =>{
        request({
            method:'post',
            url:'/wlsbgl/user/deleteUser',
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
//查询所有角色
export const selectRole = (selectRoleData) => {
    return new Promise((resolve,reject) =>{
        request({
            method:'post',
            url:'/wlsbgl/role/selectRoleUser',
            data: qs.stringify(selectRoleData)  //将传递的参数变为字符形式
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