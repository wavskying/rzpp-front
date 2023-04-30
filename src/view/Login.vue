<template>
  <body id="poster">

  <el-form class="login-container" label-position="left" label-width="0px">
    <div class="title">
      <h1>人职匹配推荐系统</h1>
    </div>
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
          localStorage.setItem("roleId", res.data.data.roleId)

          this.$message({
            message: '恭喜你，登陆成功',
            type: 'success'
          });
          this.$router.push({path: '/Index'})
        } else {
          this.$message({
            message: '登录失败，请检查您的用户名和密码是否正确',
            type: 'error'
          });
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
  /*background-position: center;*/
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
  background: linear-gradient(45deg, #8c52ff, #5f2c82, #1f0a3c);
  background-size: 400% 400%;
  animation: gradient 10s ease infinite;
}

.el-input__inner:focus {
  border-color: #8c52ff !important;
  box-shadow: 0 0 10px #8c52ff !important;
  transition: all .3s;
}

.el-button {
  transition: transform 0.3s;
}

.el-button:active {
  transform: scale(0.95);
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
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

.title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 15px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.8);
}


.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

</style>
