import Vue from 'vue';
import Component from 'vue-class-component';
import Router from 'vue-router';

import HomePage from '../home';
import NotFoundPage from '../NotFoundPage';
import ErrorPage from '../ErrorPage';

import pollsRoutes from '../polls/router';
import userRoutes from '../user/router';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
]);

Vue.use(Router);

const routerObject = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/polls',
      component: () => import(/* webpackChunkName: "polls-chunk" */ '@/polls'),
      children: pollsRoutes,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user',
      component: () => import(/* webpackChunkName: "user-chunk" */ '@/user'),
      children: userRoutes
    },
    {
      path: '/error',
      name: 'error',
      component: ErrorPage
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFoundPage
    }
  ]
});

// routerObject.beforeEach(hasAuthGuard);

export default routerObject;
