import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Main from '@/pages/Main'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      name: 'index',
      path: '/',
      component: Index,
    },
    {
      name: 'main',
      path: '/main',
      component: Main,
    },
  ],
})
