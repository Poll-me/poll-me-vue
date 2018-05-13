import isLoggedGuard from '@/router/guards/is-logged';
import isNotLoggedGuard from '@/router/guards/is-not-logged';

export default [
  {
    path: 'profile',
    alias: '',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile-chunk" */ '../UserProfile'),
    beforeEnter: isLoggedGuard
  },
  {
    path: '',
    component: () => import(/* webpackChunkName: "login-chunk" */ '../login'),
    props: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login-chunk" */ '../login/LoginForm')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "login-chunk" */ '../login/RegisterForm')
      }
    ],
    beforeEnter: isNotLoggedGuard
  }
];
