import Vue from 'vue'
import Router from 'vue-router'
import Welcom from '@/components/Welcom/Welcom'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/Welcom',
      name: 'Welcom',
      component: Welcom,
    }
  ]
})
