import Vue from 'vue'
import App from './App.vue'

import './assets/styles/main.scss'

import router from './router'
import store from './store'

import './plugins/global-components'
import './plugins/global-mixins'
import './plugins/vue-axios'
import './plugins/vue-dayjs'
import './plugins/vue-swiper'
import './plugins/vue-datepicker'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
