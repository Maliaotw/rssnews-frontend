import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css'

import VueProgressBar from 'vue-progressbar'

import '@/styles/index.scss' // global css

import App from './App.vue'
import store from './store'
import router from './router'
// import store from './store'

// Vue.config.devtools = true
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
})

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee,faUserCircle,faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { faTelegram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCoffee, faUserCircle,faPowerOff);
library.add(faTelegram);
Vue.component('font-awesome-icon', FontAwesomeIcon)


import ECharts from 'vue-echarts'
Vue.component('echarts', ECharts)

import service from '@/utils/request'

// if the table component cannot access `this.$axios`, it cannot send request
Vue.prototype.$axios = service
// 注册全局事件总线
Vue.prototype.$eventBus = new Vue()


var app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

export default app