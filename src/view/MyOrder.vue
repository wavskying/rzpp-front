<template>
  <el-container style="height: calc(100% - 40px)">
    <ELHeader></ELHeader>
    <!-- 添加弹出框 -->
    <el-dialog title="添加评论" :visible.sync="dialogCommentVisible" width="30%">
      <el-form :model="form" label-width="80px">
        <el-form-item label="评分">
          <el-rate v-model="form.rate" :max="5" show-text></el-rate>
        </el-form-item>
        <el-form-item label="评论">
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入评论"
            v-model="form.text"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogCommentVisible = false">取 消</el-button>
          <el-button @click="resetForm">重置</el-button>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-footer style="background-color: #cde8ff;height: auto;min-height: 100%">
      <div class="all-orders">
        <div v-for="order in orders" :key="order.orderId" class="order" @mouseover="handleMouseOver"
             @mouseout="handleMouseOut">
          <!-- 订单上面部分 -->
          <div class="gutter-example">
            <a-row :gutter="16">
              <a-col class="gutter-row" :span="4">
                <div class="gutter-box">
                  <div class="talent-info">
                    <div class="talent-name">
                      <tr>订单号:</tr>
                      <tr>{{ order.id }}</tr>
                    </div>
                  </div>
                </div>
              </a-col>
              <a-col class="gutter-row" :span="4">
                <div class="gutter-box">
                  <div class="talent-info">
                    <div class="talent-name">
                      <tr>人才ID:</tr>
                      <tr>{{ order.tid }}</tr>
                    </div>
                  </div>
                </div>
              </a-col>
              <a-col class="gutter-row" :span="3">
                <div class="gutter-box">
                  <div class="talent-info">
                    <div class="talent-name">
                      <tr>人才姓名:</tr>
                      <tr>{{ order.talentName }}</tr>
                    </div>
                  </div>
                </div>
              </a-col>
              <a-col class="gutter-row" :span="3">
                <div class="gutter-box">
                  <div class="talent-info">
                    <div class="talent-name">
                      <tr>租用时间:</tr>
                      <tr>{{ order.hireTime }}个月</tr>
                    </div>
                  </div>
                </div>
              </a-col>
              <a-col class="gutter-row" :span="3">
                <div class="gutter-box">
                  <div class="talent-info">
                    <div class="talent-name">
                      <tr>租用总金额:</tr>
                      <tr>{{ order.hireMoney }}￥</tr>

                    </div>
                  </div>
                </div>
              </a-col>
              <a-col class="gutter-row" :span="4">
                <div class="gutter-box">
                  <div class="order-right">
                    <el-button type="primary" class="handle-del" @click="handleCommunication(order.manageUserId)">沟通
                    </el-button>
                    <el-button type="primary" class="handle-del" @click="addComment(order.tid)">添加评论
                    </el-button>
                  </div>
                </div>
              </a-col>
            </a-row>
          </div>

          <!--           订单下面部分-->
          <a-steps :current="order.orderState" status="success">
            <a-step title="支付成功" description="支付成功"/>
            <a-step title="准备入职" description="准备入职"/>
            <a-step title="正式工作" description="正式工作"/>
            <a-step title="项目交接" description="项目交接"/>
            <a-step title="订单完成" description="订单完成"/>
          </a-steps>
        </div>
      </div>
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
    </el-footer>
  </el-container>
</template>

<script>
import ELHeader from "../components/ELHeader";
import OrderStatus from '../components/OrderStatus.vue';
import httpRequest from "../utils/httpRequest";
import Communicate from "../components/Communicate";


export default {
  name: "MyOrder",
  components: {
    ELHeader,
    OrderStatus,
    Communicate,
  }, data() {
    return {
      form: {
        rate: '',
        text: '',
        talentId: '',
      },
      dialogCommentVisible: false,
      senderId: '',
      receiveId: '',
      comment: '',
      dialogVisible: false,
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
    submitForm() {
      httpRequest({
        method: "post",
        url: 'comment/addComment',
        params: {
          userId: localStorage.getItem("selfId"),
          content: this.form.text,
          talentId: this.form.talentId,
          rate: this.form.rate
        },
      }).then((res) => {
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.dialogCommentVisible = false;
      })
    },
    addComment(talentId) {
      this.form.talentId = talentId
      this.dialogCommentVisible = true;
    },
    handleCommunication(manageUserId) {
      this.dialogVisible = true
      this.receiveId = manageUserId
    },
    handleMouseOver() {
      this.isHovered = true;
      // 处理鼠标移入事件
    },
    handleMouseOut() {
      this.isHovered = false;
      // 处理鼠标移出事件
    },
  },
  mounted() {
    this.senderId = localStorage.getItem("selfId")
    httpRequest({
      method: "post",
      url: 'order/getOrderListByUserId',
      params: {
        userId: localStorage.getItem("selfId")
      },
    }).then((res) => {
      this.orders = res.data.data
    })
  }
}
</script>

<style scoped>
.all-orders {
  display: flex;
  flex-direction: column;
  gap: 0px;
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

/deep/ .el-dialog__body {
  padding: 0;
}

.el-dialog {
  max-height: 80vh;
  max-width: 80vw;
}
</style>
