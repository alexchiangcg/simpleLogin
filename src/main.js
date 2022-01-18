import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// tailwind css
import '@/assets/css/style.css'

// axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios); //啟用 vue-axios, axios

Vue.config.productionTip = false

/// api
import apiService from './api.js';
Vue.prototype.$apiService = new apiService(axios, store);

new Vue({
  router,
  store,
  render: h => h(App),
  axios,
  VueAxios,
}).$mount('#app')
