import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'pornhub',
      component: () => import(/* webpackChunkName: "pornhub" */ './generator/Pornhub.vue'),
      meta: {
        analytics: {
          pageviewTemplate(route) {
            return {
              title: 'badge-the-cover',
              page: route.path,
            }
          },
        },
      },
    },
    
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        analytics: {
          pageviewTemplate(route) {
            return {
              title: 'About',
              page: route.path,
            }
          },
        },
      },
    },
  ],
})
