import Router from 'vue-router';
import UserLogin from '../UserLogin';

export default new Router({
  base: '/user',
  mode: 'history',
  routes: [
    {
      path: '/login',
      alias: '/',
      name: 'login',
      component: UserLogin
    }
  ]
});
