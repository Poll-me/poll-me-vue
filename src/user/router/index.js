export default [
  {
    path: 'profile',
    alias: '',
    name: 'profile',
    component: () => import(/* webpackChunkName: "user-chunk" */ '../UserProfile'),
    meta: {
      requiresAuth: true
    }
  }
];
