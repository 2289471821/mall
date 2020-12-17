import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/AntDesign.js'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(error => error)
}
