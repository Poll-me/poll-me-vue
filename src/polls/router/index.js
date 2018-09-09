import pollRoutes from '../poll/router';
import pollExistsGuard from './poll-exists.guard';

export default [
  {
    path: '',
    name: 'user-polls',
    component: () => import(/* webpackChunkName: "polls-chunk" */ '../UserPolls')
  },
  {
    path: 'new/:typeId?',
    name: 'new-poll',
    props: true,
    component: () => import(/* webpackChunkName: "polls-chunk" */ '../create')
  },
  {
    path: ':key',
    component: () => import(/* webpackChunkName: "poll-chunk" */ '../poll'),
    children: pollRoutes,
    beforeEnter: pollExistsGuard
  },
  {
    path: 'not-found',
    name: 'poll-not-found',
    component: () => import(/* webpackChunkName: "polls-chunk" */ '../components/PollNotFound'),
    props: true,
    beforeEnter: (to, from, next) => {
      if (!to.params.pollKey || to.params.pollKey === 'not-found') {
        next({ replace: true, name: 'user-polls' });
      } else {
        next();
      }
    }
  }
];
