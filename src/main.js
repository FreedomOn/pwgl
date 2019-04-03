import Vue from 'vue'
// import axios from 'axios'
import lodash from 'lodash'
import VCharts from 'v-charts'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import request from '@/utils/request'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
const qs = require('qs')

Vue.use(ElementUI, { locale })
Vue.use(VCharts)

Vue.config.productionTip = false

Vue.prototype.qs = qs
Vue.prototype.$axios = request
Vue.prototype._ = lodash


router.beforeEach((to, from, next) => {
  const role = sessionStorage.getItem('role')
  if (role) {
    // console.log('登录过了')
    if (to.path === '/login') {
      next({ path: '/' })
    } else { 
      if(store.getters.userlist.length === 0){

        store.dispatch('GetuserInfo')
        const roles = [ store.getters.usertype ]

        store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        })
      }else {
        next()
      }

    }
  } else {
      // console.log('没有登录')
      if(to.path === '/login') {
        next()
      }else {
        next('/login')
      }
     
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
