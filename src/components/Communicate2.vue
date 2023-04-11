<template>
  <JwChat-index
    ref="jwChat"
    v-model="inputMsg"
    :taleList="taleList"
    :scrollType="scrollType"
    :toolConfig="tool"
    :placeholder="placeholder"
    :config="config"
    :winBarConfig="winBarConfig"
    :showRightBox="showRightBox"
    @enter="bindEnter"
    @clickTalk="talkEvent"
  >
    <!-- <template slot="enter">
      <div>自定义输入框</div>
    </template> -->
    <!-- <template slot="enterBtn">
      <div>自定义按钮</div>
    </template> -->
    <!-- <template #downBtn="{unread}">
      <div>
        未读{{unread}}
      </div>
    </template> -->
    <!-- <JwChat-rightbox
      class="rightSlot"
      :config="rightConfig"
      @click="rightClick"
    /> -->
    <!--    <JwChat-talk class="rightSlot" :Talelist="talk" :config="quickConfig" @event="bindTalk" />-->
    <!-- <template slot="tools">
      <div style="width: 20rem; text-align: right" @click="toolEvent(12)">
        <JwChat-icon type="icon-lishi" title="自定义" />
      </div>
    </template> -->

  </JwChat-index>
</template>

<script>
import httpRequest from "../utils/httpRequest";

export default {
  name: "Communicate2",
  props: {
    senderId: {
      type: String,
      required: true
    },
    receiveId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      scrollType: 'noroll', // scroll  noroll 俩种类型
      placeholder: "欢迎使用JwChat...",
      inputMsg: '',
      taleList: [],
      tool: {
        callback: this.toolEvent
      },
      config: {
        img: "image/cover.png",
        name: "JwChat",
        dept: "最简单、最便捷",
        callback: this.bindCover,
        historyConfig: {
          show: false,
          tip: "加载更多提示框,可以直接使用组件的",
          callback: this.bindLoadHistory,
        },
        quickList: [
          {text: "这里是jwchat，您想了解什么问题。", id: 3},
          {text: "jwchat是最好的聊天组件", id: 4},
          {text: "谁将烟焚散，散了纵横的牵绊；听弦断，断那三千痴缠。", id: 5},
          {text: "长夏逝去。山野间的初秋悄然涉足。", id: 6},
          {text: "江南风骨，天水成碧，天教心愿与身违。", id: 7},
          {text: "总在不经意的年生。回首彼岸。纵然发现光景绵长。", id: 8},
          {text: "外面的烟花奋力的燃着，屋里的人激情的说着情话", id: 10},
          {text: "假如你是云，我就是雨，一生相伴，风风雨雨；", id: 11},
          {
            text: "即使泪水在眼中打转，我依旧可以笑的很美，这是你学不来的坚强。",
            id: 12,
          },
          {
            text: " 因为不知来生来世会不会遇到你，所以今生今世我会加倍爱你。",
            id: 13,
          },
        ],
      },
      rightConfig: {
        listTip: "当前在线",
        notice:
          "【公告】这是一款高度自由的聊天组件，基于AVue、Vue、Element-ui开发。点个赞再走吧 ",
        filterTip: "好友过滤",
        list: [
          {
            name: "JwChat",
            img: "image/three.jpeg",
            id: 1,
          },
          {
            id: 2,
            name: "JwChat",
            img: "image/three.jpeg",
          },
          {
            id: 3,
            name: "JwChat",
            img: "image/three.jpeg",
          },
          {
            id: 4,
            name: "留恋人间不羡仙",
            img: "image/one.jpeg",
          },
          {
            name: "只盼流星不盼雨",
            img: "image/two.jpeg",
          },
        ],
      },
      talk: [
        "快捷回复1",
        "快捷回复2",
        "快捷回复3",
        "快捷回复4",
        "快捷回复5",
        "快捷回复6",
      ],
      quickConfig: {
        nav: ["快捷回复", "超级回复"],
        showAdd: true,
        maxlength: 200,
        showHeader: true,
        showDeleteBtn: true,
      },
      showRightBox: false,
      winBarConfig: {
        active: "win01",
        width: "180px",
        listHeight: "60px",
        list: [],
        callback: this.bindWinBar,
      },
    }
  },
  methods: {
    /**
     * @description: 点击加载更多的回调函数
     * @param {*}
     * @return {*}
     */
    async bindLoadHistory() {
      const history = new Array(3).fill().map((i, j) => {
        return {
          date: "2020/05/20 23:19:07",
          text: {text: j + new Date()},
          mine: false,
          name: "JwChat",
          img: "image/three.jpeg",
        };
      });
      let list = history.concat(this.taleList);
      this.taleList = list;
      console.log("加载历史", list, history);
      //  加载完成后通知组件关闭加载动画
      this.config.historyConfig.tip = "加载完成";
      this.$nextTick(() => {
        this.$refs.jwChat.finishPullDown();
      });
    },
    bindEnter(e) {
      console.log(e)
      // 获取当前时间的时间戳
      let timestamp = Date.now();
      // 将时间戳转换为日期对象
      let date = new Date(timestamp);
      // 格式化日期，比如："2022-04-10 14:30:00"
      let formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      this.taleList.push({
        "date": formattedDate,
        "text": {"text": e},
        "mine": true,
        "name": this.config.name,
        "img": this.config.img
      })
      httpRequest({
        method: "get",
        url: 'Communicate/addMessage',
        params: {
          senderId: this.senderId,
          receiveId: this.receiveId,
          content: e,
          createTime: timestamp
        },
      }).then((res) => {
        if (res.data.code === 200) {

        }
      })

    },
    toolEvent(type, obj) {
      console.log('tools', type, obj)
    },
    talkEvent(play) {
      console.log(play)
    },
    rightClick(type) {
      console.log("rigth", type);
    },
    bindTalk(play) {
      console.log("talk", play);
      const {key, value} = play;
      if (key === "navIndex")
        this.talk = [1, 1, 1, 1, 1, 1, 1, 1].reduce((p) => {
          p.push("随机修改颜色 #" + Math.random().toString(16).substr(-6));
          return p;
        }, []);
      if (key === "select") {
        this.inputMsg = value;
        this.bindEnter();
      }
      if (key === "delIndex") {
        this.talk.splice(value, 1);
      }
    },
  },
  mounted() {
    this.config.img = localStorage.getItem("image")
    this.config.name = localStorage.getItem("name")
    console.log(this.config.img)
    httpRequest({
      method: "get",
      url: 'Communicate/getSessionListBySenderId',
      params: {
        senderId: this.senderId
      },
    }).then((res) => {
      if (res.data.code === 200) {
        this.winBarConfig.list = res.data.data
      }
    })
    httpRequest({
      method: "get",
      url: 'Communicate/getHistoryMessage',
      params: {
        senderId: this.senderId,
        receiveId: this.receiveId
      },
    }).then((res) => {
      if (res.data.code === 200) {
        this.taleList = res.data.data
      }
    })


    const img = 'https://www.baidu.com/img/flexible/logo/pc/result.png'

    // const list = [
    //   {
    //     "date": "2020/04/25 21:19:07",
    //     "text": { "text": "起床不" },
    //     "mine": false,
    //     "name": "留恋人间不羡仙",
    //     "img": "../image/one.jpeg"
    //   },
    //   {
    //     "date": "2020/04/25 21:19:07",
    //     "text": { "text": "<audio data-src='https://www.w3school.com.cn/i/horse.mp3'/>" },
    //     "mine": false,
    //     "name": "只盼流星不盼雨",
    //     "img": "../image/two.jpeg"
    //   },
    //   {
    //     "date": "2020/04/25 21:19:07",
    //     "text": { "text": "<img data-src='"+img+"'/>" },
    //     "mine": false,
    //     "name": "只盼流星不盼雨",
    //     "img": "../image/two.jpeg"
    //   },
    //   {
    //     "date": "2020/04/25 21:19:07",
    //     "text": { "text": "<img data-src='../image/three.jpeg'/>" },
    //     "mine": false,
    //     "name": "只盼流星不盼雨",
    //     "img": "../image/two.jpeg"
    //   },
    //   {
    //     "date": "2020/04/16 21:19:07",
    //     "text": { "text": "<video data-src='https://www.w3school.com.cn/i/movie.mp4' controls='controls' />" },
    //     "mine": true,
    //     "name": "JwChat",
    //     "img": "../image/three.jpeg"
    //   },
    //   {
    //     "date": "2021/03/02 13:14:21",
    //     "mine": false,
    //     "name": "留恋人间不羡仙",
    //     "img": "../image/one.jpeg",
    //     "text": {
    //       system: {
    //         title: '在接入人工前，智能助手将为您首次应答。',
    //         subtitle: '猜您想问:',
    //         content: [
    //           {
    //             id: `system1`,
    //             text: '组件如何使用'
    //           },
    //           {
    //             id: `system2`,
    //             text: '组件参数在哪里查看'
    //           },
    //           {
    //             id: 'system',
    //             text: '我可不可把组件用在商业'
    //           }
    //         ]
    //       }
    //     }
    //   },
    //   {
    //     "date": "2020/04/25 21:19:07",
    //     "text": {
    //       "text": "<i class='el-icon-document-checked' style='font-size:2rem;'/>",
    //       "subLink":{
    //         "text": "a.txt",
    //         "prop": {
    //           underline: false
    //         }
    //       },
    //     },
    //     "mine": false,
    //     "name": "留恋人间不羡仙",
    //     "img": "../image/one.jpeg"
    //   },
    // ]
    // this.taleList = list
  }
}
</script>

<style scoped>

</style>
