import Router from 'vue-router';

import UserPolls from '../UserPolls';
import pollGuard from './poll-guard';

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
      name: 'poll',
      component: () => import('../poll'),
      beforeEnter: pollGuard
    }
  ]
});
