export default [
  {
    path: '/site',
    name: '站点地图',
    icon: 'smile',
    component: '@/pages/RoadMap',
  },
  { path: '/', redirect: '/site' },
  { component: './404' },
];
