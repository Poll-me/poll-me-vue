import Vue from 'vue';
import Router from 'vue-router';

import pollGuard from './poll-guard';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: { name: 'default' }
    },
    {
      path: '/polls/:route?',
      name: 'default',
      component: () => import('@/polls')
    },
    {
      path: '/poll/:key',
      name: 'poll',
      component: () => import('@/poll'),
      beforeEnter: pollGuard
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
