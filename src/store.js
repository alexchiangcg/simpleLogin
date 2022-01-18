import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showLog: true,
    isEncryption: true,

    apiUrl:process.env.VUE_APP_API,
    account:'',
    isLogin:'0'
  },
  mutations: {

  },
  actions: {

  }
})
