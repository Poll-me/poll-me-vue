import Router from 'vue-router';

import pollRoutes from '../poll/router';
import UserPolls from '../UserPolls';
import pollExistsGuard from './poll-exists.guard';

export default new Router({
  base: '/polls',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'user-polls',
      component: UserPolls
    },
    {
      path: '/:key',
      component: () => import(/* webpackChunkName: "poll-chunk" */ '../poll'),
      children: pollRoutes,
      beforeEnter: pollExistsGuard
    }
  ]
});
