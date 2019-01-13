import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Sheet from '@/pages/Sheet'

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
      name: 'sheet',
      path: '/sheet',
      component: Sheet,
    },
  ],
})
