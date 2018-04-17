import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import conference from '../components/conference/conference'
import Infos from '../components/infos/infos'
import Detail from '../components/detail/detail'
import update from '../components/update/update'
export default new Router({
  routes: [{
    path: '/',
    redirect: '/infoDetail'
  }, {
    path: '/home',
    component: conference
  }, {　　　　
    path: '/infoDetail',
    component: Infos　　
  }, {
    path: '/detail/:id',
    component: Detail
  }, {
    path: '/update/:id',
    component: update
  }]
})
