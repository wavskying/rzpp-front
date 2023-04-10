<template>
  <div class="imui-center">
    <lemon-imui
      :user="user"
      ref="IMUI"
      :contextmenu="contextmenu"
      :contact-contextmenu="contactContextmenu"
      :theme="theme"
      :hide-menu="hideMenu"
      :hide-menu-avatar="hideMenuAvatar"
      :hide-message-name="hideMessageName"
      :hide-message-time="hideMessageTime"
      @change-menu="handleChangeMenu"
      @change-contact="handleChangeContact"
      @pull-messages="handlePullMessages"
      @message-click="handleMessageClick"
      @menu-avatar-click="handleMenuAvatarClick"
      @send="handleSend"
    >
      <template #cover>
        <div class="cover">
          <i class="lemon-icon-message"></i>
          <p><b>自定义封面 Lemon</b> IMUI</p>
        </div>
      </template>
      <template #message-title="contact">
        <span>{{ contact.displayName }}</span>
        <small class="more" @click="changeDrawer(contact, $refs.IMUI)"
        >{{
            ($refs.IMUI ? $refs.IMUI.drawerVisible : false) ? "关闭" : "打开"
          }}抽屉</small
        >
        <br/>
      </template>
    </lemon-imui>

  </div>
</template>

<script>

const getTime = () => {
  return new Date().getTime();
};
const generateRandId = () => {
  return Math.random()
    .toString(36)
    .substr(-8);
};
const generateRandWord = () => {
  return Math.random()
    .toString(36)
    .substr(2);
};
const generateMessage = (toContactId = "", fromUser) => {
  if (!fromUser) {
    fromUser = {
      id: "system",
      displayName: "系统测试",
      avatar: "http://upload.qqbodys.com/allimg/1710/1035512943-0.jpg",
    };
  }
  return {
    id: generateRandId(),
    status: "succeed",
    type: "text",
    sendTime: getTime(),
    content: generateRandWord(),
    //fileSize: 1231,
    //fileName: "asdasd.doc",
    toContactId,
    fromUser,
  };
};

export default {
  name: "app",
  data() {
    return {
      theme: "default",
      contactContextmenu: [
        {
          text: "删除该聊天",
          click: (e, instance, hide) => {
            const {IMUI, contact} = instance;
            IMUI.updateContact({
              id: contact.id,
              lastContent: null,
            });
            if (IMUI.currentContactId == contact.id) IMUI.changeContact(null);
            hide();
          },
        },
        {
          text: "设置备注和标签",
        },
        {
          text: "投诉",
        },
        {
          icon: "lemon-icon-message",
          render: (h, instance, hide) => {
            return (
              <div style="display:flex;justify-content:space-between;align-items:center;width:130px">
                <span>加入黑名单</span>
                <span>
                  <input type="checkbox" id="switch"/>
                  <label id="switch-label" for="switch">
                    Toggle
                  </label>
                </span>
              </div>
            );
          },
        },
        {
          click(e, instance, hide) {
            const {IMUI, contact} = instance;
            IMUI.removeContact(contact.id);
            if (IMUI.currentContactId == contact.id) IMUI.changeContact(null);
            hide();
          },
          color: "red",
          text: "删除好友",
        },
      ],
      contextmenu: [
        {
          click: (e, instance, hide) => {
            const {IMUI, message} = instance;
            const data = {
              id: generateRandId(),
              type: "event",
              //使用 jsx 时 click必须使用箭头函数（使上下文停留在vue内）
              content: (
                <div>
                  <span>
                    你撤回了一条消息{" "}
                    <span
                      v-show={message.type == "text"}
                      style="color:#333;cursor:pointer"
                      content={message.content}
                      on-click={e => {
                        IMUI.setEditorValue(e.target.getAttribute("content"));
                      }}
                    >
                      重新编辑
                    </span>
                  </span>
                </div>
              ),

              toContactId: message.toContactId,
              sendTime: getTime(),
            };
            IMUI.removeMessage(message.id);
            IMUI.appendMessage(data, true);
            hide();
          },
          visible: instance => {
            return instance.message.fromUser.id == this.user.id;
          },
          text: "撤回消息",
        },
        {
          visible: instance => {
            return instance.message.fromUser.id != this.user.id;
          },
          text: "举报",
        },
        {
          text: "转发",
        },
        {
          visible: instance => {
            return instance.message.type == "text";
          },
          text: "复制文字",
        },
        {
          visible: instance => {
            return instance.message.type == "image";
          },
          text: "下载图片",
        },
        {
          visible: instance => {
            return instance.message.type == "file";
          },
          text: "下载文件",
        },
        {
          click: (e, instance, hide) => {
            const {IMUI, message} = instance;
            IMUI.removeMessage(message.id);
            hide();
          },
          icon: "lemon-icon-folder",
          color: "red",
          text: "删除",
        },
      ],
      packageData,
      hideMenuAvatar: false,
      hideMenu: false,
      hideMessageName: false,
      hideMessageTime: true,
      user: {
        id: "1",
        displayName: "June",
        avatar: "",
      },
    };
  },
  mounted() {
    const contactData1 = {
      id: "contact-1",
      displayName: "工作协作群",
      avatar: "http://upload.qqbodys.com/img/weixin/20170804/ji5qxg1am5ztm.jpg",
      index: "[1]群组",
      unread: 0,
      lastSendTime: 1566047865417,
      lastContent: "2",
    };
    const contactData2 = {
      id: "contact-2",
      displayName: "自定义内容",
      avatar: "http://upload.qqbodys.com/img/weixin/20170807/jibfvfd00npin.jpg",
      //index: "Z",
      click(next) {
        next();
      },
      renderContainer: () => {
        return <h1 style="text-indent:20px">自定义页面</h1>;
      },
      lastSendTime: 1345209465000,
      lastContent: "12312",
      unread: 2,
    };
    const contactData3 = {
      id: "contact-3",
      displayName: "铁牛",
      avatar: "http://upload.qqbodys.com/img/weixin/20170803/jiq4nzrkrnd0e.jpg",
      index: "T",
      unread: 32,
      lastSendTime: 3,
      lastContent: "你好123",
    };
    const contactData4 = {
      id: "contact-4",
      displayName: "如花",
      avatar:
        "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4275424924,2201401076&fm=111&gp=0.jpg",
      index: "",
      unread: 1,
      lastSendTime: 3,
      lastContent: "吃饭了嘛",
    };

    const {IMUI} = this.$refs;
    setTimeout(() => {
      IMUI.changeContact("contact-1");
    }, 500);

    IMUI.setLastContentRender("event", message => {
      return `[自定义通知内容]`;
    });

    let contactList = [
      // {...contactData1},
      {...contactData2},
      {...contactData3},
      //...Array(100).fill(contactData1)
    ];

    IMUI.initContacts(contactList);
    IMUI.initMenus([
      {
        name: "messages",
      },
      {
        name: "contacts",
      },
      {
        name: "custom1",
        title: "自定义按钮1",
        unread: 0,
        render: menu => {
          return <i class="lemon-icon-attah"/>;
        },
        renderContainer: () => {
          return (
            <div class="article">
              <ul>
                <li class="article-item">
                  <h2>人民日报谈网红带货：产品真的值得买吗？</h2>
                </li>
                <li class="article-item">
                  甘肃夏河县发生5.7级地震 暂未接到人员伤亡报告
                </li>
                <li class="article-item">
                  北方多地风力仍强沙尘相伴,东北内蒙古等地迎雨雪
                </li>
                <li class="article-item">
                  英货车案：越南警方采集疑死者家属DNA作比对
                </li>
                <li class="article-item">
                  知名连锁咖啡店的蛋糕吃出活虫 曝光内幕太震惊
                </li>
              </ul>
              <lemon-contact
                props={{contact: contactData1}}
                style="margin:20px"
              />
              <lemon-contact
                props={{contact: contactData3}}
                style="margin:20px"
              />
            </div>
          );
        },
        isBottom: true,
      },
      {
        name: "custom2",
        title: "自定义按钮2",
        unread: 0,
        click: () => {
          alert("拦截导航点击事件");
        },
        render: menu => {
          return <i class="lemon-icon-group"/>;
        },
        isBottom: true,
      },
    ]);

    IMUI.initEditorTools([
      {
        name: "emoji",
      },
      {
        name: "uploadFile",
      },
      {
        name: "uploadImage",
      },
      {
        name: "test1",
        click: () => {
          IMUI.$refs.editor.selectFile("application/vnd.ms-excel");
        },
        render: () => {
          return <span>Excel</span>;
        },
      },
      {
        name: "test1",
        click: () => {
          IMUI.initEditorTools([{name: "uploadFile"}, {name: "emoji"}]);
        },
        render: () => {
          return <span>重制工具栏</span>;
        },
      },
      {
        name: "test2",
        isRight: true,
        title: "上传 Excel",
        click: () => {
          alert("点击了 ··· ");
        },
        render: () => {
          return <b>···</b>;
        },
      },
    ]);
    IMUI.initEmoji(EmojiData);

    IMUI.setLastContentRender("voice", message => {
      return <span>[语音]</span>;
    });

    const {SimpleIMUI} = this.$refs;
    contactData1.id = "11";
    SimpleIMUI.initContacts([contactData1]);
    SimpleIMUI.initEmoji(EmojiData);
    SimpleIMUI.changeContact(contactData1.id);
  },
  methods: {
    changeTheme() {
      this.theme = this.theme == "default" ? "blue" : "default";
    },
    scrollToTop() {
      document.body.scrollIntoView();
    },
    handleMenuAvatarClick() {
      console.log("Event:menu-avatar-click");
    },
    handleMessageClick(e, key, message, instance) {
      console.log("点击了消息", e, key, message);

      if (key == "status") {
        instance.updateMessage({
          id: message.id,
          status: "going",
          content: "正在重新发送消息...",
        });
        setTimeout(() => {
          instance.updateMessage({
            id: message.id,
            status: "succeed",
            content: "发送成功",
          });
        }, 2000);
      }
    },
    changeMenuAvatarVisible() {
      this.hideMenuAvatar = !this.hideMenuAvatar;
    },
    changeMenuVisible() {
      this.hideMenu = !this.hideMenu;
    },
    changeMessageNameVisible() {
      this.hideMessageName = !this.hideMessageName;
    },
    changeMessageTimeVisible() {
      this.hideMessageTime = !this.hideMessageTime;
    },
    removeMessage() {
      const {IMUI} = this.$refs;
      const messages = IMUI.getCurrentMessages();
      const id = messages[messages.length - 1].id;
      if (messages.length > 0) {
        IMUI.removeMessage(id);
      }
    },
    updateMessage() {
      const {IMUI} = this.$refs;
      const messages = IMUI.getCurrentMessages();
      const message = messages[messages.length - 1];
      if (messages.length > 0) {
        const update = {
          id: message.id,
          status: "succeed",
          type: "file",
          fileName: "被修改成文件了.txt",
          fileSize: "4200000",
        };
        if (message.type == "event") {
          update.fromUser = this.user;
        }
        IMUI.updateMessage(update);
        IMUI.messageViewToBottom();
      }
    },
    appendCustomMessage() {
      const {IMUI} = this.$refs;
      const message = {
        id: generateRandId(),
        status: "succeed",
        type: "voice",
        sendTime: getTime(),
        content: "语音消息",
        params1: "1",
        params2: "2",
        toContactId: "contact-1",
        fromUser: this.user,
      };
      IMUI.appendMessage(message, true);
    },
    appendMessage() {
      const {IMUI} = this.$refs;
      const contact = IMUI.currentContact;
      const message = generateMessage("contact-3");
      message.fromUser = {
        ...message.fromUser,
        ...this.user,
      };
      IMUI.appendMessage(message, true);
    },
    appendEventMessage() {
      const {IMUI} = this.$refs;
      const message = {
        id: generateRandId(),
        type: "event",
        content: (
          <span>
            邀请你加入群聊{" "}
            <span
              style="color:#333;cursor:pointer"
              on-click={() => alert("OK")}
            >
              接受
            </span>
          </span>
        ),
        toContactId: "contact-3",
        sendTime: getTime(),
      };
      IMUI.appendMessage(message, true);
    },
    updateContact() {
      this.$refs.IMUI.updateContact({
        id: "contact-3",
        unread: 10,
        displayName: generateRandWord(),
        lastSendTime: getTime(),
        lastContent: "修改昵称为随机字母",
      });
    },
    changeDrawer(contact, instance) {
      instance.changeDrawer({
        //width: 240,
        //height: "90%",
        //offsetX:0 ,
        //offsetY: ,
        //position: "center",
        // inside: true,
        // offsetX: -280,
        // offsetY: -100,
        render: () => {
          return (
            <div class="drawer-content">
              <p>
                <b>自定义抽屉</b>
              </p>
              <p>{contact.displayName}</p>
            </div>
          );
        },
      });
    },
    handleChangeContact(contact, instance) {
      console.log("Event:change-contact");
      instance.updateContact({
        id: contact.id,
        unread: 0,
      });
      instance.closeDrawer();
    },
    handleSend(message, next, file) {
      console.log(message, next, file);
      setTimeout(() => {
        next();
      }, 1000);
    },
    handlePullMessages(contact, next, instance) {
      const otheruser = {
        id: contact.id,
        displayName: contact.displayName,
        avatar: contact.avatar,
      };
      setTimeout(() => {
        const messages = [
          generateMessage(instance.currentContactId, this.user),
          generateMessage(instance.currentContactId, otheruser),
          generateMessage(instance.currentContactId, this.user),
          generateMessage(instance.currentContactId, otheruser),
          generateMessage(instance.currentContactId, this.user),
          generateMessage(instance.currentContactId, this.user),
          generateMessage(instance.currentContactId, otheruser),
          {
            ...generateMessage(instance.currentContactId, this.user),
            ...{status: "failed"},
          },
        ];
        let isEnd = false;
        if (
          instance.getMessages(instance.currentContactId).length +
          messages.length >
          11
        )
          isEnd = true;
        next(messages, isEnd);
      }, 500);
    },
    handleChangeMenu() {
      console.log("Event:change-menu");
    },
    openCustomContainer() {
    },
  },
};
</script>
.action
margin-top 20px
.lemon-button
margin-right 10px
margin-bottom 10px
.link
font-size 14px
margin-top 15px
a
display inline-block
margin 0 5px
text-decoration none
background #ffba00
border-radius 4px
padding 5px 10px
color rgba(0,0,0,0.8)
.logo
position relative
display inline-block
margin 60px auto
user-select none
.logo-text
font-size 38px
.logo-sub
font-size 18px
color #999
font-weight 300
.logo-badge
position absolute
top -10px
left 230px
background #000
border-radius 16px
color #f9f9f9
font-size 12px
padding 4px 8px
.title
font-size 24px
line-height 26px
border-left 1px solid #ffba00
padding-left 15px
margin-bottom 15px
margin-top 30px
user-select none
.table
width 100%
border-radius 10px
background #fff
border-collapse collapse
tr
cursor pointer
tr:not(.table-head):hover
background #ffba00 !important
tr:nth-of-type(even)
background #f9f9f9
th
user-select none
color #999
td,
th
text-align left
padding 10px 15px
font-size 14px
font-weight normal
.imui-center
margin-bottom 60px
.lemon-wrapper
border:1px solid #ddd;
.lemon-drawer
border:1px solid #ddd;
border-left:0;
.drawer-content
padding 15px
.more
font-size 12px
line-height 24px
height 24px
position absolute
top 14px
right 14px
cursor pointer
user-select none
color #f1f1f1
display inline-block
border-radius 4px
background #111
padding 0 8px
&:active
background #999
.bar
text-align center
line-height 30px
background #fff
margin 15px
color #666
user-select none
font-size 12px
.cover
text-align center
user-select none
position absolute
top 50%
left 50%
transform translate(-50%,-50%)
i
font-size 84px
color #e6e6e6
p
font-size 18px
color #ddd
line-height 50px
.article-item
line-height 34px
cursor pointer
&:hover
text-decoration underline
color #318efd
pre
background #fff
border-radius 8px
padding 15px
.lemon-simple .lemon-container{
z-index:5
}
.lemon-simple .lemon-drawer{
z-index:4
<style scoped>

</style>
