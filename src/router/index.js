import Vue from 'vue';
import Component from 'vue-class-component';
import Router from 'vue-router';

import NotFoundPage from '../NotFoundPage';
import pollsRoutes from '../polls/router';
import userRoutes from '../user/router';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
]);

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: {
        name: 'user-polls'
      }
    },
    {
      path: '/polls',
      component: () => import(/* webpackChunkName: "polls-chunk" */ '@/polls'),
      children: pollsRoutes
    },
    {
      path: '/user',
      component: () => import(/* webpackChunkName: "user-chunk" */ '@/user'),
      children: userRoutes
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFoundPage
    }
  ]
});
