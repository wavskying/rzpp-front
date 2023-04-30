<template>
  <el-container style="height: calc(100% - 40px)">
    <ELHeader></ELHeader>
    <el-footer style="background-color: #eef7f9;height: auto;min-height: 100%">
      <div class='box'>
        <div class="top">
          <div class="left">
            <el-carousel trigger="click" height="500px">
              <el-carousel-item v-for="item, index in bannerList" :key="index">
                <img :src="item.url" style="height: auto" alt="">
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="right" style="height: 500px">
            <!--            <div class="item">-->
            <!--              <div class="leftNum">1</div>-->
            <!--              <div class="leftImg">-->
            <!--                <img src="../assets/image/listOne.jpeg" alt="">-->
            <!--              </div>-->
            <!--              <div class="leftInfo">-->
            <!--                <div class="topText">【Java开发】张三 - 20000</div>-->
            <!--                <div class="bottomText">-->
            <!--                  2875浏览-->
            <!--                  <span class="hosetitem-circle"></span>-->
            <!--                  69评论-->
            <!--                  <span class="hosetitem-circle"></span>-->
            <!--                  41收藏-->
            <!--                </div>-->
            <!--              </div>-->
            <!--              <div class="rightInfo">-->
            <!--                <div class="topNum">25703 热度</div>-->
            <!--              </div>-->
            <!--              <div class="rightButton">-->
            <!--                <div class="userImg">-->
            <!--                  <img src="../assets/image/userOne.jpg" alt="">-->
            <!--                </div>-->
            <!--                <div class="userName">颜淡慕潇</div>-->
            <!--                <div class="button">关注</div>-->
            <!--              </div>-->
            <!--            </div>-->

            <div class="item" v-for="talent,index in talentSort">
              <div class="leftNum">{{ index + 1 }}</div>
              <div class="leftImg">
                <img :src="talent.image" alt="">
              </div>
              <div class="leftInfo">
                <div class="topText"  @click="getInformation(talent.talent_id,talent.user_id)">【{{
                    talent.position_name
                  }}】{{ talent.NAME }}-{{ talent.cost }}￥
                </div>
                <div class="bottomText">
                  {{ talent.order_sum }}下单数
                  <span class="hosetitem-circle"></span>
                  {{ talent.comment_sum }}评论
                  <span class="hosetitem-circle"></span>
                  94收藏
                </div>
              </div>
              <div class="rightInfo">
                <div class="topNum">2056 热度</div>
              </div>
              <div class="rightButton">
                <div class="userImg">
                  <img src="../assets/image/userTwo.jpg" alt="">
                </div>
                <div class="userName">{{ talent.name }}</div>
                <div class="button" @click="handleCommunication(talent.user_id)">沟通</div>
              </div>
            </div>


          </div>
        </div>

        <div class="bottom">
          <div class="title">合作企业</div>
          <div class="listBox">
            <div class="itemBox">
              <img src="../assets/image/sdds.jpeg" alt="">
              <div style="margin-left: 10px;margin-top: 10px;margin-bottom:10px;font-size: 18px;">山东电视台</div>
            </div>
            <div class="itemBox">
              <img src="../assets/image/zgmt.jpg" alt="">
              <div style="margin-left: 10px;margin-top: 10px;margin-bottom:10px;font-size: 18px;">
                中国贵州茅台酒厂(集团)有限责任公司
              </div>
            </div>
            <div class="itemBox">
              <img src="../assets/image/bwf.png" alt="">
              <div style="margin-left: 10px;margin-top: 10px;margin-bottom:10px;font-size: 18px;">博为峰(北京)信息技术有限公司</div>
            </div>
          </div>
          <div class="listBox">
            <div class="itemBox">
              <img
                src="https://xycy-file.zhaopin.com/xyactivity/2023/4/17/17/45/fefa753ef76f4d75a5afdf84ec5287bf_.jpg?x-oss-process=image/resize,w_330/quality,q_80"
                alt="">
              <div style="margin-left: 10px;margin-top: 10px;margin-bottom:10px;font-size: 18px;">
                2023生物医药北京专场线上招聘会
              </div>
            </div>
            <div class="itemBox">
              <img
                src="https://xycy-file.zhaopin.com/xyactivity/2023/4/12/17/59/059442d89ace42208bf47175bed1ad51_.jpg?x-oss-process=image/resize,w_330/quality,q_80"
                alt="">
              <div style="margin-left: 10px;margin-top: 10px;margin-bottom:10px;font-size: 18px;">
                中国人民财产保险股份有限公司
              </div>
            </div>
            <div class="itemBox">
              <img
                src="https://xycy-file.zhaopin.com/xyactivity/2023/4/21/16/14/0649bfe3e9474a8e88ecb29e675e6a11_.jpg?x-oss-process=image/resize,w_330/quality,q_80"
                alt="">
              <div style="margin-left: 10px;margin-top: 10px;margin-bottom:10px;font-size: 18px;">
                中国邮政储蓄银行股份有限公司
              </div>
            </div>
          </div>
          <div class="listBox">
            <div class="itemBox">
              <img
                src="https://xycy-file.zhaopin.com/xyactivity/2023/3/1/11/55/8006bae7a42e441ab1b2e8c45631e0b7_.jpg?x-oss-process=image/resize,w_330/quality,q_80"
                alt="">
              <div style="margin-left: 10px;margin-top: 10px;margin-bottom:10px;font-size: 18px;">

                职场英才招募令2023春季线上招聘会

              </div>
            </div>
            <div class="itemBox">
              <img
                src="https://xycy-file.zhaopin.com/xyactivity/2023/4/25/13/55/86e43306ab3c4cb7a81b503a137e4b25_.jpg?x-oss-process=image/resize,w_330/quality,q_80"
                alt="">
              <div style="margin-left: 10px;margin-top: 10px;margin-bottom:10px;font-size: 18px;">
                达内时代科技集团有限公司
              </div>
            </div>
            <div class="itemBox">
              <img
                src="https://xycy-file.zhaopin.com/xyactivity/2023/4/20/15/25/e768a28d65694642a2b9a8cebe500d29_.jpeg?x-oss-process=image/resize,w_330/quality,q_80"
                alt="">
              <div style="margin-left: 10px;margin-top: 10px;margin-bottom:10px;font-size: 18px;">
                横琴粤澳深度合作区执行委员会
              </div>
            </div>
          </div>
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
import httpRequest from "../utils/httpRequest";
import Communicate from "../components/Communicate";

export default {
  components: {
    ELHeader,
    Communicate,
  },
  name: "Index",
  data() {
    return {
      dialogVisible: false,
      senderId: '',
      receiveId: '',
      bannerList: [
        {url: require('../assets/image/bannerO.jpg')},
      ],
      talentSort: [],
    };
  },
  methods: {
    handleCommunication(user_id) {
      this.receiveId = user_id
      if (localStorage.getItem("roleId") === "1") {
        this.dialogVisible = true
      } else {
        this.$message.info('您没有此权限');
      }
    },
    getInformation(talentId, userId) {
      this.$router.push({path: '/Talent', query: {talentId: talentId, userId: userId}})
    },
  },
  mounted() {
    this.senderId = localStorage.getItem("selfId")
    httpRequest({
      method: "get",
      url: 'talent/getTalentSort',
    }).then((res) => {
      console.log(res.data.data)
      this.talentSort = res.data.data
    })

  },
}
</script>

<style scoped lang="less">

.box {
  overflow: hidden;
  min-height: 100vh;
  padding-bottom: 300px;
}

.el-carousel__item h3 {

  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item {
  img {
    width: 100%;
    height: 666px;
    object-fit: cover;
  }
}

.top {
  display: flex;
  margin: 0 2%;
  margin-top: 2%;

  .left {
    width: 66%;
    margin-right: 2%;
  }

  .right {
    width: 40%;
    height: 666px;
    margin-left: 2%;

    .item {
      display: flex;
      width: 100%;
      // height: 70px;
      border-bottom: 1px solid #e9e9e9;
      padding: 24px 0;
      position: relative;

      .leftNum {
        color: #999aaa;
        font-size: 20px;
        width: 44px;
        text-align: center;
      }

      .leftImg {
        overflow: hidden;
        margin-right: 16px;

        img {
          width: 107px;
          height: 60px;
          border-radius: 4px;
        }
      }

      .leftInfo {
        width: 300px;

        .topText {
          font-size: 16px;
          font-weight: 600;
          color: #222226;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          word-break: break-all;
          cursor: pointer;
        }

        .bottomText {
          font-size: 14px;
          color: #777888;
          line-height: 20px;
          margin-top: 18px;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;

          .hosetitem-circle {
            display: inline-block;
            width: 3px;
            height: 3px;
            background: #555666;
            border-radius: 50%;
            margin-left: 8px;
            margin-right: 8px;
            vertical-align: middle;
          }
        }
      }

      .rightInfo {
        position: absolute;
        right: 10px;
        top: 20px;
        color: #777888;
        font-size: 14px;

      }

      .rightButton {
        display: flex;
        align-items: center;
        position: absolute;
        right: 10px;
        top: 60px;

        .userImg {
          img {
            width: 32px;
            border-radius: 50%;
          }
        }

        .userName {
          font-size: 16px;
          color: #222226;
          white-space: pre;
          margin-left: 8px;
          cursor: pointer;
        }

        .button {
          width: 74px;
          cursor: pointer;
          height: 24px;
          border-radius: 12px;
          border: 1px solid #ccccd8;
          line-height: 22px;
          text-align: center;
          color: #555666;
          margin-left: 16px;
          transition: all .3s;
        }

        .button:hover {
          border-color: #272727;
        }
      }
    }
  }

}

.bottom {
  margin-top: 35px;

  .title {
    text-align: center;
    font-size: 28px;
  }

  .listBox {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 30px;

    .itemBox {
      width: 30%;
      box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%);
      border-radius: 8px;
      border: 1px solid #d4d4d4;
      overflow: hidden;

      img {
        width: 100%;
      }
    }
  }
}</style>
