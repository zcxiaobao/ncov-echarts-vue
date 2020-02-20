import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Default from '@/default/default.vue'
import NcovMap from '@/views/ncov-map.vue'
import NcovMap2 from '@/views/ncov-map2.vue'
import NcovTable from '@/views/ncov-table.vue'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Default',
    redirect: '/ncov-map',
    component: Default,
    children: [{
      name: 'NcovMap',
      path: 'ncov-map',
      component: NcovMap2
    }, {
      name: 'NcovTable',
      path: 'ncov-table',
      component: NcovTable
    }]
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
