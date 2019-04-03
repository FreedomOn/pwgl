<template>
  <el-menu class="navbar" mode="horizontal">
    <!-- <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger> -->
    <!-- <breadcrumb></breadcrumb> -->
    <div class="logoImage">
    
    </div>
    <div  class="headernav">
      <ul>
        <li>
          <router-link to='/info'>概要信息</router-link>
        </li>
        <li>
          <router-link to='/bushu'>部署总览</router-link>
        </li>
        <li>
          <router-link to='/deviceMange'>设备管理</router-link>
        </li>
        <li>
          <router-link to='/configurationInformation'>配置信息</router-link>
        </li>
        <li>
          <router-link to='/containerApplication'>容器应用</router-link>
        </li>
        <li>
          <router-link to='/SystemManagement'>系统管理</router-link>
        </li>
      </ul>
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
    <router-view></router-view>
    
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  data () {
    return {
      imgerr: ''
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
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  overflow: hidden;
  .logoImage{
    height: 100%;
    width: 20%;
    background: url(/static/bg/aabg.png) no-repeat center center fixed;
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

