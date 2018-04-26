import Router from 'vue-router';
import UserProfile from '../UserProfile';

export default new Router({
  base: '/user',
  mode: 'history',
  routes: [
    {
      path: '/profile',
      alias: '/',
      name: 'profile',
      component: UserProfile
    }
  ]
});
