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
      path: '/polls/:route*',
      name: 'default',
      component: () => import('@/polls')
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
