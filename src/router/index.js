import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import workList from '@/components/workList.vue'
import pictureDetail from '@/components/pictureDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/workList',
      name: 'workList',
      component: workList
    },
    {
      path: '/pictureDetail/:id',
      name: 'pictureDetail',
      component: pictureDetail
    },
  ]
})
