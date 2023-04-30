<template>
  <el-container style="height: calc(100% - 40px)">
    <ELHeader></ELHeader>
    <el-footer style="background-color: #eef7f9;height: auto;min-height: 100%">
      <div class="order-container">
        <el-form :model="orderForm" ref="orderForm" label-position="right" label-width="120px">
          <el-form-item label="人才姓名">
            <span>{{ talentName }}</span>
          </el-form-item>
          <el-form-item label="性别">
            <span>{{ gender }}</span>
          </el-form-item>
          <el-form-item label="年龄">
            <span>{{ age }}</span>
          </el-form-item>
          <el-form-item label="职位类型">
            <span>{{ positionType }}</span>
          </el-form-item>
          <el-form-item label="雇佣期限" prop="hireTime" @change="handleHireTimeChange">
            <el-select v-model="orderForm.hireTime" placeholder="请选择雇佣期限" @change="handleHireTimeChange">
              <el-option v-for="item in hireTimeOptions" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="雇佣金额">
            <span>{{ paymentMoney }}</span>
          </el-form-item>
          <el-form-item label="支付方式" prop="paymentMethod">
            <el-radio-group v-model="orderForm.paymentMethod">
              <el-radio label="1">支付宝</el-radio>
              <el-radio label="2">微信</el-radio>
              <el-radio label="3">银行卡</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitOrderForm">下单</el-button>
            <el-button @click="resetOrderForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import ELHeader from "../components/ELHeader";
import httpRequest from "../utils/httpRequest";

export default {
  name: "Order",
  components: {
    ELHeader,
  },
  data() {
    return {
      orderForm: {
        talentName: "",
        hireTime: "",
        hireCost: "",
        paymentMethod: "1"
      },
      talentName: "张三",
      gender: '男',
      age: 12,
      positionType: "Java",
      paymentMoney: 0,
      cost: 0,
      hireTimeOptions: [
        {
          value: 1,
          label: "1个月"
        },
        {
          value: 2,
          label: "3个月"
        },
        {
          value: 6,
          label: "6个月"
        },
        {
          value: 12,
          label: "12个月"
        }
      ]
    };
  },
  mounted() {
    this.talentName = this.$route.query.talentName
    this.gender = this.$route.query.talentSex
    this.age = this.$route.query.talentAge
    this.positionType = this.$route.query.talentPositionName
    this.cost = this.$route.query.talentCost
  },
  methods: {
    handleHireTimeChange(value) {
      this.paymentMoney = value * parseInt(this.cost);
    },
    submitOrderForm() {
      let talentId = this.$route.query.talentId
      let manageUserId = this.$route.query.manageUserId
      let talentName = this.$route.query.talentName
      httpRequest({
        method: "post",
        url: '/order/addOrder',
        params: {
          employerId: localStorage.getItem("selfId"),
          talentId: talentId,
          hireTime: this.orderForm.hireTime,
          hireMoney: this.paymentMoney,
          userId: localStorage.getItem("selfId"),
          manageUserId: manageUserId,
          talentName: talentName
        },
      }).then((res) => {
        if (res.data.code === 200) {
          this.$router.push({path: '/Success', query: {talentId: this.$route.query.talentId}})
        }
      })
    },
    resetOrderForm() {
      this.$refs.orderForm.resetFields();
    }
  }
}

</script>

<style scoped>
.order-container {
  width: 80%;
  margin: 0 auto;
  padding-top: 50px;
}
</style>
