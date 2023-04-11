<template>
  <body id="poster">

  <el-form class="login-container" label-position="left" label-width="0px">
    <h3 class="login_title">
      系统登陆
      <el-button type="primary" @click="toRegister()">点我注册</el-button>
    </h3>
    <el-form-item label="">
      <el-input type="text" v-model="loginForm.username" placeholder="账号" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="">
      <el-input type="password" v-model="loginForm.password" placeholder="密码" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" @click="login()" style="width: 100%;background:#505458;border: none">登陆</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>
import httpRequest from "../utils/httpRequest";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        region: '',
      }
    }
  },
  methods: {
    login() {
      httpRequest({
        method: "post",
        url: '/user/login',
        params: {
          username: this.loginForm.username,
          password: this.loginForm.password
        },
      }).then((res) => {
        if (res.data.code === 200) {

          localStorage.setItem("token", res.data.data.token)
          localStorage.setItem("selfId", res.data.data.id)
          localStorage.setItem("name", res.data.data.name)
          localStorage.setItem("image", res.data.data.image)

          this.$message({
            message: '恭喜你，登陆成功',
            type: 'success'
          });
          this.$router.push({path: '/Home'})
        }
      })
    },
    toRegister() {
      this.$router.push({path: '/Register'})
    }
  }
}
</script>

<style scoped>
#poster {
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

body {
  margin: 0px;
  padding: 0px;
}

.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

</style>
