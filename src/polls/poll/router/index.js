export default [
  {
    path: '',
    name: 'poll-view',
    component: () => import(/* webpackChunkName: "poll-chunk" */ '../PollView')
  }
];
