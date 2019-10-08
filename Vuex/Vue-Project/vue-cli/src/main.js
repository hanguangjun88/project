import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import '../src/assets/css/reset.css'
import '../src/assets/css/header.css'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
