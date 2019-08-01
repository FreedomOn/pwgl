import request from '@/utils/request'
import qs from 'qs'

export function getAllData(allData) {
  return new Promise ((resolve,reject) => {
    request({
      method: 'post',
      url:'/wlsbgl/host/getAllHostDevicePz', 
      data: qs.stringify(allData)
    }).then((val) => {
      resolve(val.data)
    }).catch((err) => {
       reject(err)
    })
  })
}
//修改宿主急
export function upateSzjData(updateData) {
    return new Promise ((resolve,reject) => {
      request({
        method: 'post',
        url:'/wlsbgl/host/updateHost', 
        data: qs.stringify(updateData)
      }).then((val) => {
        resolve(val.data)
      }).catch((err) => {
         reject(err)
      })
    })
  }
//获取所有传感器
export function getSensorData(sensorData) {
    return new Promise ((resolve,reject) => {
      request({
        method: 'post',
        url:'/wlsbgl/sensor/getSensorTypeDevice', 
        data: qs.stringify(sensorData)
      }).then((val) => {
        resolve(val.data)
      }).catch((err) => {
         reject(err)
      })
    })
  }
  //新增传感器
export function addSensor(sensorData) {
    return new Promise ((resolve,reject) => {
      request({
        method: 'post',
        url:'/wlsbgl/sensor/addSensor', 
        data: qs.stringify(sensorData)
      }).then((val) => {
        resolve(val.data)
      }).catch((err) => {
         reject(err)
      })
    })
  }
//.查询出来所有的设备
export function getAllDevice() { 
    return new Promise ((resolve,reject) => {
      request({
        method: 'post',
        url:'/wlsbgl/device/getAllDeviceIdName', 
      }).then((val) => {
        resolve(val.data)
      }).catch((err) => {
         reject(err)
      })
    })
  }
  //.将所有传感器的类型查询出来
export function getAllSensorType() {
    return new Promise ((resolve,reject) => {
      request({
        method: 'post',
        url:'/wlsbgl/sensor/getAllSensorType', 
      }).then((val) => {
        resolve(val.data)
      }).catch((err) => {
         reject(err)
      })
    })
  }
   //修改传感器
export function updateSensor(updateSensoData) {
  return new Promise ((resolve,reject) => {
    request({
      method: 'post',
      url:'/wlsbgl/sensor/updateSensor', 
      data: qs.stringify(updateSensoData)
    }).then((val) => {
      resolve(val.data)
    }).catch((err) => {
       reject(err)
    })
  })
}
   //删除传感器
   export function deleteSensor(deleteSensoData) {
    return new Promise ((resolve,reject) => {
      request({
        method: 'post',
        url:'/wlsbgl/sensor/deleteSensor', 
        data: qs.stringify(deleteSensoData)
      }).then((val) => {
        resolve(val.data)
      }).catch((err) => {
         reject(err)
      })
    })
  }
  //获取所有通讯信息
export function getinformationData(getinformationData) {
  return new Promise ((resolve,reject) => {
    request({
      method: 'post',
      url:'/wlsbgl/comm/getAllCommAndDevice', 
      data: qs.stringify(getinformationData)
    }).then((val) => {
      resolve(val.data)
    }).catch((err) => {
       reject(err)
    })
  })
}
 //删除通讯信息
 export function deleteinformation(deleteinformationdata) {
  return new Promise ((resolve,reject) => {
    request({
      method: 'post',
      url:'/wlsbgl/comm/deleteComm', 
      data: qs.stringify(deleteinformationdata)
    }).then((val) => {
      resolve(val.data)
    }).catch((err) => {
       reject(err)
    })
  })
}
//新增通讯信息
export function addinformation(addinformationdata) {
  return new Promise ((resolve,reject) => {
    request({
      method: 'post',
      url:'/wlsbgl/comm/addComm', 
      data: qs.stringify(addinformationdata)
    }).then((val) => {
      resolve(val.data)
    }).catch((err) => {
       reject(err)
    })
  })
}
//修改通讯信息
export function updateinformation(updateinformationdata) {
  return new Promise ((resolve,reject) => {
    request({
      method: 'post',
      url:'/wlsbgl/comm/updateComm', 
      data: qs.stringify(updateinformationdata)
    }).then((val) => {
      resolve(val.data)
    }).catch((err) => {
       reject(err)
    })
  })
}