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

import BaiduMap from 'vue-baidu-map'
import VueAMap from 'vue-amap'

import '@/icons' // icon
import '@/permission' // permission control
const qs = require('qs')

Vue.use(ElementUI, { locale })
Vue.use(VCharts)
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'DNmlfhwkFOLiSovfFzm8Mj4IxxK6fbcO'
})
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '3c14af81a3f3cad7e7bc54a5722d857f',
  plugin: ['Geolocation', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})
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
