import Vue from 'vue'
import Router from 'vue-router'
import PageIndex from '@/pages/PageIndex'
import PageDetail from '@/pages/PageDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/demo/vueFlickerApp/',
  routes: [
    {
      name: 'index',
      path: '/',
      component: PageIndex,
    },
    {
      name: 'detail',
      path: '/:id(\\d+)',
      component: PageDetail,
    },
  ],
})
