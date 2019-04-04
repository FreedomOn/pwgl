<template>
 <div class="contain">
    <div class="navbar" mode="horizontal">
    <div class="logoImage" @click="toHome" style="cursor:pointer">
      FogCore
    </div>
    <div  class="headernav">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"  :router="true">
           <!-- <el-menu-item index="/dashboard">首页</el-menu-item> -->
        <el-menu-item index="/info">概要信息</el-menu-item>
        <el-menu-item index="/bushu">部署总览</el-menu-item>
        <el-menu-item index="/deviceMange">设备管理</el-menu-item>
         <el-menu-item index="/configurationInformation">配置信息</el-menu-item>
          <el-menu-item index="/containerApplication">容器应用</el-menu-item>
          <el-menu-item index="/SystemManagement">系统管理</el-menu-item>
</el-menu>
<div class="line"></div>
    </div>
    <div class="avatar-username">
       {{name}}
    </div>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar" :onerror="imgerr">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
    <router-view></router-view>
 </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  data () {
    return {
      imgerr: '',
     activeIndex:'/dashboard',
    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'avatartype',
      'usertype',
      'name'
    ])
  },
  mounted() {
    let avatarname = this.getAvatarerr(this.avatartype, this.usertype)
    this.imgerr = "this.onerror='';this.src='" + require('@/assets/avatar/'+avatarname+'') + "'"
  },
  methods: {
    toHome:function(){
      this.$router.push('/dashboard')
    },
    // 获取头像404图片
    getAvatarerr (arr, type) {
       let avatararr = arr.filter((item) => {
         return item.type = type
       })
       return avatararr[0].avatar
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      sessionStorage.removeItem("role")
      localStorage.removeItem("user")
      location.reload()
      // this.$store.dispatch('LogOut').then(() => {
      //   location.reload() // 为了重新实例化vue-router对象 避免bug
      // })

    }
  }
}
</script>  

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 60px;
  line-height: 60px;
  border-radius: 0px !important;
  overflow: hidden;
  .logoImage{
    height: 100%;
    width: 20%;
    background: #409EFF;
    color: #fff;
    text-align: center;
    // background: url(/static/bg/aabg.png) no-repeat center center fixed;
    float: left;
  }
  .headernav{
    float: left;
    ul{
      display: inline-block;
      li{
        display: inline-block;
        margin-left: 10px;
      }
    }
  }
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-username {
    position: absolute;
    right: 100px;
    top: 0;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

