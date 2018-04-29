import Router from 'vue-router';
import UserPolls from '../UserPolls';

export default new Router({
  base: '/polls',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'polls',
      component: UserPolls
    }
  ]
});
