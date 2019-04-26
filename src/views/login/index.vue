<template>
  <div class="login-container">
    <div class="login-logo">
        <img src="/static/bg/bbloge.png" alt="">
      </div>
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <p>用户名</p>
      <el-form-item prop="username">
        <el-input name="username" type="text" v-model="loginForm.name" autoComplete="off" placeholder="工号" />
      </el-form-item>
      <p>密码</p>
      <el-form-item prop="password">
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="off"
          placeholder="密码"></el-input>
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="eye" />
          </span>
      </el-form-item>
      <div class="save-password">
        <el-checkbox v-model="checked">记住密码</el-checkbox>
      </div>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>


  </div>
</template>

<script>
import { login } from '@/api/login'

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value == "") {
         callback(new Error('不能为空哦'))
      } else {
         callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      eye: 'eye',
      checked: true,
      loginForm: {
        name: '123456',
        password: '123456'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  mounted() {
    
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
        this.eye = 'eyeopen'
      } else {
        this.pwdType = 'password'
        this.eye = 'eye'
      }
    },
    async loadlogin (data) {
      let that = this
      console.log(3333)
       let userdata = await login(data)
       console.log(userdata);
       if(userdata.status !== 200) {
          that.$message.error('账号或密码错误，请联系管理员');
          that.loading = false
          return false
      }
      sessionStorage.setItem('role', userdata.data.loginName);  //这个是路由拦截所需要的
      // localStorage.setItem('role', userdata.data.userNumber);
      // localStorage.setItem('countryCode',userdata.data.countryCode);
      // localStorage.setItem('userType', userdata.data.userType);
      console.log(4444)
      localStorage.setItem('user', JSON.stringify(userdata.data));
      that.$router.push({ path: '/' })
    },
    handleLogin() {
      const that = this
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          try {
            that.loadlogin(that.loginForm)
          } catch (err) {
            console.log(err)
            this.loading = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray: #555;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 2555, 255, 1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
$img: 100%;
.save-password {
  margin-bottom: 10px;
}
.login-logo {
  position: absolute;
  left: 0;
  right: 0;
  width: 600px;
  padding: 35px 35px 15px 35px;
  margin: 100px auto;
  img {
    width: 100%;
  }
}
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background: url(/static/images/login_bg.png) no-repeat center center fixed;
  background-size: cover;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 220px auto;
    background-color: rgba(255, 2555, 255, .9);
    box-shadow: -7px 4px 20px 0px rgba(0, 1, 1, 0.26);
	  opacity: 0.9;
    border-radius: 6px;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
