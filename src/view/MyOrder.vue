<template>
  <el-container style="height: calc(100% - 40px)">
    <ELHeader></ELHeader>
    <el-footer style="background-color: #eef7f9;height: auto;min-height: 100%">
      <div class="all-orders">
        <div v-for="order in orders" :key="order.orderId" class="order" @mouseover="handleMouseOver"
             @mouseout="handleMouseOut">
          <!-- 订单上面部分 -->
          <div class="gutter-example">
            <a-row :gutter="16">
              <a-col class="gutter-row" :span="6">
                <div class="gutter-box">
                  <div class="talent-info">
                    <div class="talent-name">人才姓名: {{ order.talentName }}</div>
                  </div>
                </div>
              </a-col>
              <a-col class="gutter-row" :span="6">
                <div class="gutter-box">
                  <div class="talent-info">
                    <div class="talent-name">人才姓名: {{ order.talentName }}</div>
                  </div>
                </div>
              </a-col>
              <a-col class="gutter-row" :span="6">
                <div class="gutter-box">
                  <div class="talent-info">
                    <div class="talent-name">人才姓名: {{ order.talentName }}</div>
                  </div>
                </div>
              </a-col>
              <a-col class="gutter-row" :span="6">
                <div class="gutter-box">
                  <div class="order-right">
                    <button class="btn-communicate">沟通</button>
                  </div>
                </div>
              </a-col>
            </a-row>
          </div>

          <!--           订单下面部分-->
          <a-steps :current="4" status="error">
            <a-step title="Finished" description="支付成功"/>
            <a-step title="Finished" description="准备入职"/>
            <a-step title="In Progress" description="正式工作"/>
            <a-step title="Waiting" description="结束交接"/>
            <a-step title="Waiting" description="订单完成"/>
          </a-steps>
        </div>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import ELHeader from "../components/ELHeader";
import OrderStatus from '../components/OrderStatus.vue';


export default {
  name: "MyOrder",
  components: {
    ELHeader,
    OrderStatus
  }, data() {
    return {
      orders: [
        {
          orderId: 1,
          talentName: '张三',
          fullName: '张三丰',
          amount: 1000,
          status: '进行中',
        },
        {
          orderId: 2,
          talentName: '李四',
          fullName: '李四光',
          amount: 2000,
          status: '已完成',
        },
        {
          orderId: 3,
          talentName: '王五',
          fullName: '王五金',
          amount: 3000,
          status: '待付款',
        },
      ],
    };
  },
  methods: {
    handleMouseOver() {
      this.isHovered = true;
      // 处理鼠标移入事件
    },
    handleMouseOut() {
      this.isHovered = false;
      // 处理鼠标移出事件
    },
  },
}
</script>

<style scoped>
.all-orders {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
  padding: 20px;
  transition: box-shadow 0.3s ease;
}

.order-left {
  display: flex;
  align-items: center;
}

.order-id {
  font-size: 20px;
  font-weight: bold;
  color: #333333;
  margin-right: 24px;
}

.talent-info {
  margin-right: 24px;
}

.talent-name {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 4px;
}

.talent-fullname {
  font-size: 14px;
  color: #666666;
}

.order-amount {
  font-size: 18px;
  font-weight: bold;
  color: #FF6161;
  margin-right: 24px;
}

.btn-communicate {
  font-size: 16px;
  color: #FFFFFF;
  background-color: #FF6161;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
}


.btn-communicate:hover {
  background-color: #4cae4c;
}

.order-status {
  margin-top: 10px;
}
</style>
