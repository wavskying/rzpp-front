<template>
  <el-header style="background-color: #202329;height: 8%;padding: 0px">
    <el-row style="height: 60px">
      <el-col :span="2" class="logo">
        <img src="../assets/logo.png" alt="logo" style="height: 50px;width: 50px">
      </el-col>
      <el-col :span="4">
        <el-button-group>
          <el-button type="primary" class="home-button" @click="goHome" style="height: 55px;background-color: #202329">首页</el-button>
          <el-button type="primary" class="home-button" @click="goHome" style="height: 55px;background-color: #202329">订单</el-button>
        </el-button-group>
      </el-col>
      <el-col :span="16">
        <div id="header" style="background-color: #202329">
        <span data-v-6c36d3c0="" class="el-avatar el-avatar--circle"><img
          src="../assets/head.png" style="object-fit: cover;"></span>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>

export default {
  name: "Header",
  methods: {
    goHome() {
      alert(11)
      this.$router.push({path: '/Home'})
    }
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
  width: 100vw;
}
.logo {
  text-align: center;
}
.search-input {
  width: 200px;
  margin-right: 20px;
}
.home-button {
  height: 30px;
  margin-left: 10px;
  border: none;

}
.home-button:hover {
  border: 1px solid #666;
  color: #409EFF;
}
</style>
