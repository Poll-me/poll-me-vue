import isLoggedGuard from '@/router/guards/is-logged';

export default [
  {
    path: 'profile',
    alias: '',
    name: 'profile',
    component: () => import(/* webpackChunkName: "user-chunk" */ '../UserProfile'),
    beforeEnter: isLoggedGuard
  },
  {
    path: 'login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login-chunk" */ '../login')
  }
];
