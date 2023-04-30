// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueAxios from "vue-axios";
import axios from "axios";
import httpRequest from "./utils/httpRequest";
import LemonIMUI from 'lemon-imui';
import 'lemon-imui/dist/index.css';
import Chat from 'vue-beautiful-chat'
import JwChat from 'jwchat';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';


import store from "./store";

import "./styles/base.css";
import "./styles/common.css";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/iconfont/iconfont.css";

ElementUI.Dialog.props.closeOnClickModal.default = false;
Vue.config.productionTip = false;

Vue.use(Antd);

Vue.config.productionTip = false

Vue.use(Chat)
Vue.use(ElementUI);
Vue.use(VueAxios, axios)
Vue.use(httpRequest)
Vue.use(LemonIMUI);
Vue.use(JwChat)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
})
