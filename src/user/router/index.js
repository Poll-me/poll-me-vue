export default [
  {
    path: 'profile',
    alias: '',
    name: 'profile',
    component: () => import(/* webpackChunkName: "user-chunk" */ '../UserProfile')
  },
  {
    path: 'login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login-chunk" */ '../login')
  }
];
