<template>
  <body id="poster">
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px" class="register-container">
    <div class="title">
      <h1>人职匹配推荐系统</h1>
    </div>
    <h3 class="register_title">
      系统注册
      <el-button type="primary" @click="toLogin()">点我登陆</el-button>
    </h3>
    <el-form-item label="">
      <el-input type="text" v-model="ruleForm.username" placeholder="账号" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="" prop="password">
      <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item label="" prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="确认密码"></el-input>
    </el-form-item>
    <el-form-item label="" prop="email">
      <el-input type="text" v-model="ruleForm.email" placeholder="邮箱" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-select v-model="ruleForm.ruleId" placeholder="请选择角色类型" style="width: 100%">
        <el-option label="用户" value="1"></el-option>
        <el-option label="管理员" value="2"></el-option>
        <el-option label="超级管理员" value="3"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" @click="register()" style="width: 100%;background:#505458;border: none">注册</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>
import httpRequest from "../utils/httpRequest";

export default {
  name: "Register",
  data() {
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: '',
        password: '',
        checkPass: '',
        email: '',
        ruleId: ''
      },
      rules: {
        password: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        email: [
          {validator: checkEmail, trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    register() {
      httpRequest({
        method: "post",
        url: '/user/register',
        params: {
          username: this.ruleForm.username,
          password: this.ruleForm.password,
          email: this.ruleForm.email,
          roleId: this.ruleForm.ruleId
        },
      }).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            message: '恭喜你，注册成功',
            type: 'success'
          });
          this.toLogin()
        } else {
          this.$message.error(res.data.message);
        }
      })
    },
    toLogin() {
      this.$router.push("/")
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
.title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 15px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.8);
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

.register-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.register_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>
