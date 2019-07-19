import axios from 'axios'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message, MessageBox } from 'element-ui'
import store from '../store'
// import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 50000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  NProgress.start()
  // if (store.getters.token) {
  //   config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */
    NProgress.done()
    // console.log(response.status)
    if(response.status == 500 || response.status == 504) {
      Message({
        message: '服务器维修中，请联系开发人员',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    }else if(response.status == 200) {
        return response
      // }
    }else if (response.status === 302) {
        console.log('我进来了吗')
        MessageBox.confirm('长时间未进行操作，你可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('role')
          localStorage.removeItem("user")
          location.reload()
          // store.dispatch('FedLogOut').then(() => {
          //   location.reload()// 为了重新实例化vue-router对象 避免bug
          // })
        })
      }
      return Promise.reject('error')  

   
  },
  error => {
    NProgress.done()
    console.log('err' + error)// for debug
    return Promise.reject(error)
  }
)

export default service
