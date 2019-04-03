import request from '@/utils/request'
import qs from 'qs'


// 作业总数
export function queryAllOrg(postdata) {
  return new Promise ((resolve,reject) => {
    request({
      method: 'post',
      url:'tianyujia/Login!queryAllOrg.action', 
      data: qs.stringify(postdata)
    }).then((val) => {
      resolve(val.data)
    }).catch((err) => {
       reject(err)
    })
  })
}


// 执行中和未执行的施工计划
export function AndToimplement(postdata) {
  return new Promise ((resolve,reject) => {
    request({
      method: 'post',
      url:'tianyujia/Login!queryImplementAndToimplement.action', 
      data: qs.stringify(postdata)
    }).then((val) => {
      resolve(val.data)
    }).catch((err) => {
       reject(err)
    })
  })
}

// 查询计划数量和开工数量
export function queryStartNumber(postdata) {
  return new Promise ((resolve,reject) => {
    request({
      method: 'post',
      url:'tianyujia/Login!queryStartNumber.action', 
      data: qs.stringify(postdata)
    }).then((val) => {
      resolve(val.data)
    }).catch((err) => {
       reject(err)
    })
  })
}

