import Router from 'vue-router';
import PollContainer from '../PollContainer';

export default new Router({
  base: '/poll',
  mode: 'history',
  routes: [
    {
      path: '/:key',
      name: 'poll-view',
      component: PollContainer
    }
  ]
});
