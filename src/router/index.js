/*
 * @Descripttion:
 * @version:
 * @Author: zcxiaobao
 * @Date: 2020-02-14 16:54:57
 * @LastEditors: zcxiaobao
 * @LastEditTime: 2020-03-30 21:58:09
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Default from '@/default/default.vue'
import NcovMap from '@/views/ncov-map.vue'
import NcovMap2 from '@/views/ncov-map2.vue'
import NcovInfo from '@/views/ncov-info.vue'
import NcovAllCities from '@/views/ncov-all-cities.vue'
import NcovWorldMap from '@/views/ncov-world-map.vue'
import OverSeas from '@/views/overseas.vue'
import RealTime from '@/views/realtime.vue'
import Authority from '@/views/authority'
import Paper from '@/views/paper'
import China from '@/views/china'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Default',
    redirect: '/ncov-map',
    component: Default,
    children: [
      {
        name: 'NcovMap',
        path: 'ncov-map',
        component: NcovMap2
      },
      {
        name: 'NcovInfo',
        path: 'ncov-info',
        component: NcovInfo
      },
      {
        name: 'NcovAllCities',
        path: 'ncov-map-all-city',
        component: NcovAllCities
      },
      {
        name: 'NcovWorldMap',
        path: 'ncov-world-map',
        component: NcovWorldMap
      },
      {
        name: 'China',
        path: 'china',
        component: China
      },
      {
        name: 'OverSeas',
        path: 'overseas',
        component: OverSeas
      },
      {
        name: 'RealTime',
        path: 'realtime',
        component: RealTime
      },
      {
        name: 'Authority',
        path: 'authority',
        component: Authority
      },
      {
        name: 'Paper',
        path: 'paper',
        component: Paper
      }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
