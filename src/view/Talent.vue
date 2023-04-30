<template>
  <el-container style="height: calc(100% - 40px)">
    <ELHeader></ELHeader>
    <el-footer style="background-color: #eef7f9;height: auto;min-height: 100%">
      <el-card style="margin: 20px 40px; display: flex; flex-direction: column;">
        <!-- 人才基本信息 -->
        <div style="display: flex; align-items: center; margin-top: 20px;">
          <div style="margin-right: 20px; width: 300px">
            <!--            <el-avatar size="auto" shape="square" :src="talent.image"></el-avatar>-->
            <img :src="talent.image" style="width: 200px;height: 200px">
          </div>
          <div style="width: 1000px">
            <h2>{{ talent.name }}</h2>
            <p>{{ talent.sex }} | {{ talent.age }}岁 | {{ talent.positionName }}</p>
            <p>{{ talent.information }}</p>
          </div>
          <!-- 聊天通信入口 -->
          <div style="text-align: right; margin-top: 10px;">
            <el-button type="success" circle style="font-size: 20px;" @click="handleCommunication">
            <span style="display: flex; align-items: center;">
              <el-icon class="icon-communication"/>
              <span style="margin-left: 0px;">沟通</span>
            </span>
            </el-button>

          </div>
          <!-- 下单 -->
          <div style="text-align: right; margin-top: 10px;">
            <el-button type="success" circle style="font-size: 20px;" @click="handleOrder">
            <span style="display: flex; align-items: center;">
              <el-icon class="icon-communication"/>
              <span style="margin-left: 0px;">下单</span>
            </span>
            </el-button>

          </div>
        </div>

        <!-- 技能列表 -->
        <div style="margin-top: 20px;">
          <h3>个人技能</h3>
          <el-table :data="talent.skills" style="width: 100%">
            <el-table-column prop="name" label="技能名"></el-table-column>
            <el-table-column prop="ability" label="熟练度">
              <template slot-scope="scope">
                <el-progress :percentage="scope.row.ability" :color="getColor(scope.row.ability)"
                             :text-inside="true"></el-progress>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 评论列表 -->
        <h3 style="margin-top: 20px;">评论列表</h3>
        <div v-for="comment in comments" :key="comment.id" class="comment-item"
             style="display: flex; align-items: center; margin-top: 10px;">
          <el-avatar :size="50" :src="comment.avatar"></el-avatar>
          <div style="margin-left: 10px;">
            <el-rate :value="comment.rating" :show-score="true" :max="5" :disabled="true"></el-rate>
            <p>{{ comment.comment }}</p>
          </div>
        </div>
      </el-card>
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
import Communicate from "../components/Communicate";
import httpRequest from "../utils/httpRequest";


export default {
  components: {
    ELHeader,
    Communicate,
  },
  name: "Talent",
  data() {
    return {
      senderId: "",
      receiveId: "",
      dialogVisible: false,
      talent: {
        name: "张三",
        sex: "男",
        age: 24,
        positionName: "后端开发",
        information: "",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        skills: [],
        cost: ""
      },
      comments: [
        {
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
          name: '张三',
          rating: 5,
          comment: '技术很厉害，非常满意！'
        },
        {
          avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
          name: '李四',
          rating: 4,
          comment: '人挺好，就是做事有点慢。'
        },
        {
          avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
          name: '王五',
          rating: 3,
          comment: '还行吧，没什么特别突出的地方。'
        }
      ]
    };
  },
  methods: {
    getColor(level) {
      if (level >= 90) {
        return "#67C23A";
      } else if (level >= 80) {
        return "#409EFF";
      } else {
        return "#F56C6C";
      }
    },
    handleCommunication() {
      if (localStorage.getItem("roleId") === "1") {
        this.dialogVisible = true
      } else {
        this.$message.info('您没有此权限');
      }
    },
    handleOrder() {
      if (localStorage.getItem("roleId") === "1") {
        this.$router.push({
          path: '/Order',
          query: {
            talentId: this.$route.query.talentId,
            talentName: this.talent.name,
            talentSex: this.talent.sex,
            talentCost: this.talent.cost,
            talentAge: this.talent.age,
            talentPositionName: this.talent.positionName,
            manageUserId: this.$route.query.userId
          }
        })
      } else {
        this.$message.info('您没有此权限');
      }
    }
  },
  mounted() {
    httpRequest({
      method: "Get",
      url: 'talent/getTalentInformation',
      params: {
        talentId: this.$route.query.talentId
      },
    }).then((res) => {
      if (res.data.code === 200) {
        let information = res.data.data.information
        this.talent.skills = res.data.data.skillList
        this.talent.name = information.name
        this.talent.sex = information.sex
        this.talent.age = information.age
        this.talent.information = information.information
        this.talent.image = information.image
        this.receiveId = this.$route.query.userId
        this.talent.cost = information.cost
        this.senderId = localStorage.getItem("selfId")
      }
    })
  }
}
</script>

<style scoped>
.comment-item {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  transition: border-width 0.2s ease-in-out;
}

.comment-item:hover {
  border-top-color: black;
  border-bottom-color: black;
}


/deep/ .el-dialog__body {
  padding: 0;
}

.el-dialog {
  max-height: 80vh;
  max-width: 80vw;
}

</style>
