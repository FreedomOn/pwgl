<template>
 <div class="contain">
    <div class="navbar" mode="horizontal">
    <div class="logoImage"  style="cursor:pointer">
      FogCore
    </div>
    <div  class="headernav">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"  @select="handleSelect" :router="true">
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
    <div class="avatar-username"  @click="personInfo()" style="cursor:pointer">
       {{name}}
    </div>
    <el-dropdown class="avatar-container"  trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar" :onerror="imgerr">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <!-- <router-link class="inlineBlock" to="/info"> -->
          <!-- <el-dropdown-item>
            <span @click="goHome">首页</span> 
          </el-dropdown-item> -->
        <!-- </router-link> -->
        <el-dropdown-item >
          <span @click="logout" style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog
            title="个人设置"
            :visible.sync="adduserdialogVisible"
            width="60%"
            :before-close="handleClose">
                <div class="adduserbody">
                    <div class="adduserbodyleft">
                        <el-form :label-position="labelPosition" label-width="80px" :model="adduserform" :rules="rules" ref="adduserform">   
                            <el-form-item label="姓名" prop="name">
                                <el-input v-model="adduserform.name" style="width:400px"></el-input>
                            </el-form-item>
                            <el-form-item label="邮件" prop="email">
                                <el-input v-model="adduserform.email" style="width:400px"></el-input>
                            </el-form-item>
                            <el-form-item label="电话" prop="phone">
                                <el-input v-model="adduserform.phone" style="width:400px"></el-input>
                            </el-form-item>
                            <el-form-item label="原密码" prop="oldpassword">
                                <el-input v-model="adduserform.oldpassword" type="password" style="width:400px"></el-input>
                            </el-form-item>
                            <el-form-item label="新密码" prop="newpassword">
                                <el-input v-model="adduserform.newpassword" type="password" style="width:400px"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" prop="twopassword">
                                <el-input v-model="adduserform.twopassword" type="password" style="width:400px"></el-input>
                            </el-form-item>
                             
                        </el-form>
                    </div> 
                    <div class="adduserbodyright">
                        <el-form>
                            <el-form-item label="头像上传:" prop="image">
                                <el-upload
                                    class="avatar-uploader"
                                    action="https://ode.com/posts/"
                                    :show-file-list="false"
                                    :auto-upload="false"
                                    :on-change ="updatainputUpload"
                                    >
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="adduserdialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureAddUser('adduserform')">确 定</el-button>
            </span>
        </el-dialog>
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
    let validatePass = (rule, value, callback) => {
        
          if (this.adduserform.twopassword !== '') {
            this.$refs.adduserform.validateField('twopassword');
          }
          callback();
        
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.adduserform.newpassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      imgerr: '',
      activeIndex:'/info',
      adduserdialogVisible:false,
      labelPosition: 'right',
      imageUrl:'',
      updataimagefile:'',
      updataimagefileName:'',
      adduserform:{
          name:'',
          email:'',
          phone:'',
          oldpassword:'',
          newpassword:'',
          twopassword:'',
      },
      rules: {
        oldpassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        newpassword: [
            { validator: validatePass, trigger: 'blur' }
        ],
        twopassword: [
           { validator: validatePass2, trigger: 'blur' }
        ],
        email: [
          {  required: true, message: '请输入邮件', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ],
        phone: [
          {  required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码' }
        ],
      },
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
    let avatarname = this.getAvatarerr(this.avatartype, this.usertype);
    this.imgerr = "this.onerror='';this.src='" + require('@/assets/avatar/'+avatarname+'') + "'";
    this.getactive();
  },
  methods: {
    // toHome:function(){
    //   this.$router.push('/info')
    // },
    goHome:function(){
      console.log('sss')
      // this.getactive(); 
      this.$router.push('/info')
      // localStorage.setItem("haha", "/info");
      // this.activeIndex = localStorage.getItem('haha');
      location.reload()
         
    },
    getactive:function(){
      let active = localStorage.getItem('haha');
      console.log(222222)
      console.log(active)
      if(!active){
          this.activeIndex = '/info'
      }else{
        this.activeIndex = active;
      } 
    },
    handleClose(done) {
       done();
    },
     handleSelect(key, keyPath) {
        localStorage.removeItem("activetab")
        localStorage.removeItem("sysactivetab")
        console.log(key, keyPath);
        let aa = key;
        localStorage.setItem('haha', aa);
      },
    //个人设置
    personInfo:function(){
      console.log(111)
      // let that = this,
      this.adduserdialogVisible = true;
      let user =  JSON.parse(localStorage.getItem('user'));
      this.adduserform.name = user.name;
      this.adduserform.email = user.email;
      this.adduserform.phone = user.phone;
      this.adduserform.oldpassword = '';
      this.adduserform.newpassword = '';
      this.adduserform.twopassword = '';
    },
    updatainputUpload (file, fileList) {
        const isJPG = file.raw.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.raw.size / 1024 / 1024 < 2;
        if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
        return false
        }
        if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
        return false
        }
        // return isJPG && isLt2M;
        this.updataimagefile = file.raw
        this.updataimagefileName = file.name
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(this.updataimagefile,this.updataimagefileName)
    },
    sureAddUser(adduserform){
        let that = this;
        that.$refs[adduserform].validate((valid) => {
          if (valid) {
              this.adduserdialogVisible = false;
              let perinfo = JSON.parse(localStorage.getItem('user'));
              let loginName = perinfo.loginName
              let userid = perinfo.id
              let infpData = {
                'name':this.adduserform.name,
                'loginName':loginName,
                'email':this.adduserform.email,
                'phone':this.adduserform.phone,
                'password':this.adduserform.oldpassword,
                'loginPassword':this.adduserform.newpassword,
                'id':userid
              }
              that.$axios({
                 method:'post',
                 url:' /wlsbgl/user/updateUser',
                 data: that.qs.stringify(infpData)  //将传递的参数变为字符形式
              })
              .then((res) =>{
                  console.log(res)
                   if(res.data.status == '200'){
                    that.$notify({
                        title: '成功',
                        message: res.data.msg,
                        type: 'success'
                    });
                    // localStorage.setItem('user', JSON.stringify(userdata.data));//返回用户当前更新后的信息
                    // store.dispatch('GetuserInfo')
                    }else{
                      that.$notify.error({
                              title: '失败',
                              message: res.data.msg,
                          });
                    }
              })
              .catch((err) =>{
                console.log(err)
              })
              
          } else {
              console.log('error submit!!');
              return false;
          }
        });
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
      localStorage.removeItem("haha")
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
.adduserbody{
    overflow: hidden;
    .adduserbodyleft{
        float: left;
    }
    .adduserbodyright{
        float: right;
    }
}  
// 上传图片
.avatar-uploader {
    
    width: 270px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    // border: 1px dashed #333;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #333;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

