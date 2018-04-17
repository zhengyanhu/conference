import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import add from '../components/conference/add'
import list from '../components/conference/list'
import Detail from '../components/detail/detail'
import update from '../components/conference/update'
export default new Router({
  routes: [{
    path: '/',
    redirect: '/list'
  }, {
    path: '/add',
    component: add
  }, {　　　　
    path: '/list',
    component: list
  }, {
    path: '/detail/:id',
    component: Detail
  }, {
    path: '/update/:id',
    component: update
  }]
})
