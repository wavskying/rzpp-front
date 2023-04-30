<template>
  <el-header style="background-color: #202329;height: 8%;padding: 0px">
    <el-row style="height: 60px">
      <el-col :span="2" class="logo">
        <img src="../assets/logo.png" alt="logo" style="height: 50px;width: 50px">
      </el-col>
      <el-col :span="6">
        <el-button-group>
          <el-button type="primary" class="home-button" @click="goIndex" style="height: 55px;background-color: #202329">
            首页
          </el-button>
          <el-button type="primary" class="home-button" @click="goHome"
                     style="height: 55px;background-color: #202329">
            人才库
          </el-button>
          <el-button type="primary" class="home-button" @click="goOrder" style="height: 55px;background-color: #202329">
            我的订单
          </el-button>
          <el-button type="primary" class="home-button" @click="goCommunicate"
                     style="height: 55px;background-color: #202329">
            我的消息
          </el-button>
        </el-button-group>
      </el-col>
      <el-col :span="12">
        <p>&nbsp </p>
      </el-col>
      <el-col :span="1">
        <div id="header" style="padding-top: 6px;">
        <span data-v-6c36d3c0="" class="el-avatar el-avatar--circle"><img
          src="../assets/head.png" style="object-fit: cover;"/></span>
        </div>
      </el-col>
      <el-col :span="2">
        <div style="padding-top: 17px;color: white">
          <a style="color:white;">{{ name }}</a>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="沟通"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :width="'60%'"
      :height="'60%'"
      style="padding: 0px"
      :key="Date.now()"
    >
      <div style="width: 100%; height: 100%;">
        <Communicate :sender-id="senderId" :receive-id="receiveId" style="width: 100%; height: 100%;"/>
      </div>
    </el-dialog>
  </el-header>
</template>

<script>
import Communicate from "./Communicate";

export default {
  name: "Header",
  components: {
    Communicate
  },
  methods: {
    goHome() {
      this.$router.push({path: '/Home'})
    },
    goOrder() {
      this.$router.push({path: '/MyOrder'})
    },
    goCommunicate() {
      this.dialogVisible = true
    },
    goIndex() {
      this.$router.push({path: '/Index'})
    }
  },
  mounted() {
    this.name = localStorage.getItem("name")
  },

  data() {
    return {
      senderId: localStorage.getItem("selfId"),
      receiveId: "",
      dialogVisible: false,
      name: '',
    }
  },
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

element.style {
  background-color: rgb(32, 35, 41);
  color: white;
  padding-top: 6px;
}

/deep/ .el-dialog__body {
  padding: 0;
}

.el-dialog {
  max-height: 80vh;
  max-width: 80vw;
}
</style>
