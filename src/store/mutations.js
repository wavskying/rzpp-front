import { ASDF } from './mutation-types'
export default {
    // 方法
    meThods(state){
      state.msg="2222"
      // console.log("通过this.$store.commit('meThods','parameter')")
    },
    // 类型常量ASDF
    [ASDF](){
      console.log("类型常量ASDF")
    }
  }