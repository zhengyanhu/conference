// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
Vue.prototype.$http = axios
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  data: {
    transitionName: 'slide'
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.substring(0, to.path.length - 2).split('/').length
      //console.log(to.path.substring(0, to.path.length - 2))
      const fromDepth = from.path.substring(0, from.path.length - 2).split('/').length
      //console.log(from.path.substring(0, from.path.length - 2))
      this.transitionName = toDepth < fromDepth ? 'slide' : 'slide_back'
    }
  }

})
