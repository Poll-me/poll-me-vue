import Vue from 'vue';
import Router from 'vue-router';

import pollsRoutes from '../polls/router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: { name: 'user-polls' }
    },
    {
      path: '/polls',
      component: () => import(/* webpackChunkName: "polls-chunk" */ '@/polls'),
      children: pollsRoutes
    },
    {
      path: '/user/:route?',
      component: () => import('@/user')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});
