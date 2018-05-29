export default [
  {
    path: '',
    name: 'fill-poll',
    component: () => import(/* webpackChunkName: "poll-chunk" */ '../fill')
  }
];
