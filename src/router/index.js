import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home.vue'
import page1 from '@/components/page1.vue'
import page2 from '@/components/page2.vue'
import page3 from '@/components/page3.vue'
import page4 from '@/components/page4.vue'
import page5 from '@/components/page5.vue'
import page6 from '@/components/page6.vue'
import page7 from '@/components/page7.vue'
import page8 from '@/components/page8.vue'
import page9 from '@/components/page9.vue'
import page10 from '@/components/page10.vue'
import takeText from '@/components/takeText.vue'
import takePicture from '@/components/takePicture.vue'
import workList from '@/components/workList.vue'
import pictureDetail from '@/components/pictureDetail.vue'
import last from '@/components/last.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/page1',
      name: 'page1',
      component: page1
    },
    {
      path: '/page2',
      name: 'page2',
      component: page2
    },
    {
      path: '/page3',
      name: 'page3',
      component: page3
    },
    {
      path: '/page4',
      name: 'page4',
      component: page4
    },
    {
      path: '/page5',
      name: 'page5',
      component: page5
    },
    {
      path: '/page6',
      name: 'page6',
      component: page6
    },
    {
      path: '/page7',
      name: 'page7',
      component: page7
    },
    {
      path: '/page8',
      name: 'page8',
      component: page8
    },
    {
      path: '/page9',
      name: 'page9',
      component: page9
    },
    {
      path: '/page10',
      name: 'page10',
      component: page10
    },
    {
      path: '/takeText',
      name: 'takeText',
      component: takeText
    },
    {
      path: '/takePicture',
      name: 'takePicture',
      component: takePicture
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
    {
      path: '/last',
      name: 'last',
      component: last
    },
  ]
})
