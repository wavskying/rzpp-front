import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import moduleA from './modules/moduleA'

Vue.use(Vuex);
const data1 = { text: "分离数据1共享状态数据" };
export default new Vuex.Store({
  state: {
    msg: "11111",
    data1,
  },
  mutations,
  actions,
  getters,
  modules: {
    a:moduleA
  },
});
