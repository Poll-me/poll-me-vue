import pollRoutes from '../poll/router';
import pollExistsGuard from './poll-exists.guard';

export default [
  {
    path: '',
    name: 'user-polls',
    component: () => import(/* webpackChunkName: "polls-chunk" */ '../UserPolls')
  },
  {
    path: 'new',
    name: 'new-poll',
    component: () => import(/* webpackChunkName: "polls-chunk" */ '../create')
  },
  {
    path: ':key',
    component: () => import(/* webpackChunkName: "poll-chunk" */ '../poll'),
    children: pollRoutes,
    beforeEnter: pollExistsGuard
  }
];
