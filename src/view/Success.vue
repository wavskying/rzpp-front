<template>
  <el-container style="height: calc(100% - 40px)">
    <ELHeader></ELHeader>
    <el-footer style="background-color: #eef7f9;height: auto;min-height: 100%">
      <a-result
        status="success"
        title="恭喜您，支付成功！"
        sub-title="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      >
        <template #extra>
          <a-button key="console" type="primary" @click="handleClick">返回</a-button>
          <a-button key="buy">再次购买</a-button>
        </template>
      </a-result>
    </el-footer>
  </el-container>
</template>

<script>
import ELHeader from "../components/ELHeader";

export default {
  name: "Success",
  components: {
    ELHeader
  },
  methods: {
    handleClick() {
      this.$router.push({path: '/Talent', query: {talentId: this.$route.query.talentId}})
    }
  }
}
</script>

<style scoped>

</style>
