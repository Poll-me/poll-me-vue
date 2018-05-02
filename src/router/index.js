import Vue from 'vue';
import Router from 'vue-router';

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
      path: '/poll/:route',
      name: 'poll',
      component: () => import('@/poll')
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
