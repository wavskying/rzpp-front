<template>
  <body style="margin: 0">

  <el-container style="height: calc(100% - 40px)">
    <ELHeader></ELHeader>
    <!--    <el-main style="background-color: white;height: 40px;padding: 0">-->

    <!--    </el-main>-->
    <el-footer style="background-color: #cde8ff;height: auto;min-height: 100%">
      <el-row style="height: 60px;background-color: white;width: 100%;display: flex;">
        <el-col :span="1" style="height: 40px"></el-col>
        <el-col :span="12" style="height: 40px;width: 100%">
          <div style="margin-top: 15px;">
            <el-input id="select" placeholder="搜索关键字" v-model="select"
                      style="height: 30px;font-size: 30px;width: 1000px">
              <el-button slot="append" icon="el-icon-search" style="height: 30px" @click="queryTalent"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="8" style="height: 40px;">
          <div class="block" style="margin-top: 15px">
            <el-cascader
              placeholder="职位类型"
              :props="{ label: 'name', value: 'id' }"
              v-model="value"
              :options="options"
              @change="handleChange" style="width: 150px"></el-cascader>
          </div>
        </el-col>
      </el-row>

      <!--            该div是循环卡片列表-->
      <el-row :gutter="60">
        <div style="margin-bottom: 15px;">
          <el-col :span="4.9" v-for="item in tableData" :key="item.talentId">
            <a-card hoverable style="width: 100%;padding: 5px;margin-bottom: 7px"
                    @click="getInformation(item.id,item.idTwo)">
              <img style="height: 200px;width: 230px"
                   slot="cover"
                   alt="example"
                   :src="item.image"
              />
              <template slot="actions" class="ant-card-actions">
                <a-icon key="setting" type="setting"/>
                <a-icon key="edit" type="edit"/>
                <a-icon key="ellipsis" type="ellipsis"/>
              </template>
              <a-card-meta :title=item.name :description=item.positionName>
                <a-avatar
                  slot="avatar"
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
              </a-card-meta>
            </a-card>
          </el-col>
        </div>
      </el-row>

      <div style="margin-left:1%;margin-right:1%">
        <!--          <el-col :span="5" v-for="(item) in tableData" :key="item.talentId" :offset="1">-->
        <!--            <div style="margin-top:15px">-->
        <!--              <el-card :body-style="{ padding: '0px'}" shadow="hover">-->
        <!--                <div style="height: 150px; width: 250px; display: flex;margin: 0;">-->
        <!--                  <img :src="item.image" style="width: 100%; height: 100%;" class="image">-->
        <!--                </div>-->
        <!--                <div class="card-info">-->
        <!--                  <div class="card-text">-->
        <!--                    <span class="job-title">职位：{{ item.positionName }}</span>-->
        <!--                    <span class="job-name">姓名：{{ item.name }}</span>-->
        <!--                    <span class="job-cost">月薪：{{ item.cost }}</span>-->
        <!--                  </div>-->
        <!--                  <div class="card-bottom clearfix">-->
        <!--                    <time class="create-time"><strong>创建时间:</strong>{{ item.classCreatetime }}</time>-->
        <!--                    <el-button class="card-btn" type="text" @click="getInformation(item.id,item.idTwo)">查看</el-button>-->
        <!--                  </div>-->
        <!--                </div>-->

        <!--              </el-card>-->
        <!--            </div>-->
        <!--          </el-col>-->

      </div>


    </el-footer>
    <!--      分页div-->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current_page"
        :page-sizes="[25,30,60]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </el-container>
  </body>
</template>

<script>
import avatarURL from '../assets/head.png'
import httpRequest from "../utils/httpRequest";
import ELHeader from "../components/ELHeader";


export default {
  name: "Home",
  components: {
    ELHeader,
  },
  data() {
    return {
      // 首页头像
      avatarURL: avatarURL,

      // 搜索框数据
      select: '',

      /*级联选择器数据*/
      value: [],
      options: [],

      /*循环卡片列表的数据源以及分页数据*/
      tableData: null,
      currentPage: 1,
      total: null,
      pageSize: 25,
      listData: {},

      //v-if根据它重新实例化组件
      reset: false,
    }
  },
  methods: {
    handleSizeChange: function (size) {
      this.pageSize = size;
      this.getTalentByPage()
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      this.getTalentByPage()
    },
    getTalentByPage() {
      httpRequest({
        method: "get",
        url: 'talent/getAllByPage',
        params: {
          pageNum: this.currentPage,
          pageSize: this.pageSize
        },
      }).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.data
          this.tableData.forEach(item => {
            item.tableTalent = item.tableTalent.toString();
          });
          this.reset = true;
        }
      })
    },
    handleChange(value) {
      console.log(value);
      httpRequest({
        method: "get",
        url: 'talent/getAllByPage',
        params: {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          positionId: value[2],
        },
      }).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.data
          this.tableData.forEach(item => {
            item.tableTalent = item.tableTalent.toString();
          });
          this.reset = true;
          this.total = res.data.data.totalCount
        }
      })
    },
    queryTalent() {
      httpRequest({
        method: "get",
        url: 'talent/getAllByPage',
        params: {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          query: this.select,
        },
      }).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.data
          this.tableData.forEach(item => {
            item.tableTalent = item.tableTalent.toString();
          });
          this.total = res.data.data.totalCount
          this.reset = true;
        }
      })
    },
    getInformation(talentId, idTwo) {
      this.$router.push({path: '/Talent', query: {talentId: talentId, userId: idTwo}})
    }
  },
  mounted() {
    httpRequest({
      method: "get",
      url: 'talent/getAllByPage',
      params: {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      },
    }).then((res) => {
      if (res.data.code === 200) {
        this.tableData = res.data.data.data
        this.total = res.data.data.totalCount
        this.tableData.forEach(item => {
          item.tableTalent = item.tableTalent.toString();
        });
      }
    })
    httpRequest({
      method: "get",
      url: 'position/getRzPositionTree',
    }).then((res) => {
      if (res.data.code === 200) {
        console.log(res.data.data);
        // 将返回的树形结构数据存储到前端数据模型中
        this.options = res.data.data;
        console.log(this.options)
      }
    })
  },
}
</script>

<style scoped>
el-footer {
  background-color: #ffdbc2;
  /*background-image: url('your-image-url');*/
  background-repeat: no-repeat;
  background-size: cover;
  height: auto;
  min-height: 100%;
}

.el-avatar {
  display: inline-block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
  overflow: hidden;
  color: #fff;
  background: #C0C4CC;
  width: 40px;
  height: 40px;
  line-height: 40px;
}

.el-avatar--circle {
  border-radius: 50%;
}

.el-select .el-input {
  height: 60px;
  width: 130px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

/*/deep/ .el-input__inner {*/
/*  height: 60px;*/
/*}*/
.card-text {
  font-size: 8px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin: 10px 0;
}

.card-text span {
  font-size: 18px;
  color: #409EFF;
  margin-right: 10px;
}

.card-text br {
  display: none;
}


.card-info {
  height: 120px;
}

.card-text {
  display: flex;
  flex-direction: column;
}

.job-title {
  font-weight: bold;
}

.card-bottom {
  margin-top: 10px;
}

.create-time {
  margin-right: 10px;
}

.card-btn {
  color: #409EFF;
}
</style>
