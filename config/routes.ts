export default [
  {
    path: '/site',
    name: '站点地图',
    icon: 'smile',
    component: '@/pages/RoadMap',
  },
  {
    path: '/tapdx',
    name: 'TAPDX',
    icon: 'smile',
    component: '@/pages/tapdx',
  },
  { path: '/', redirect: '/site' },
  { component: './404' },
];
