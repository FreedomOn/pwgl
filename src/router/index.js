import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import map from '../views/bushu/map'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',//首页展示
      component: () => import('@/views/home/index')
    },{
      path:'info',//概要信息
      component: () => import('@/views/mainInfo/info')
    },{
      path:'bushu',//部署管理
      component: map
    },{
      path:'deviceMange',//设备管理
      component: () => import('@/views/deviceMange/index')
    },{
      path:'configurationInformation',//配置信息
      component: () => import('@/views/configurationInformation/index')
    },{
      path:'containerApplication',//容器应用
      component: () => import('@/views/containerApplication/index')
    },{
      path:'SystemManagement',//设备管理
      component: () => import('@/views/SystemManagement/index')
    }
  ]
  }
]

export const asyncRouterMap = [
  
  { path: '*', redirect: '/404', hidden: true }
]



export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

