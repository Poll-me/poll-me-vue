import Router from 'vue-router';

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
      name: 'poll',
      component: () => import('../poll'),
      beforeEnter: pollExistsGuard
    }
  ]
});
