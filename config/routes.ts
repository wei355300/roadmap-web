export default [
  {
    path: '*',
    layout: false,
    component: './404',
  },
  {
    path: '/site',
    name: '站点地图',
    icon: 'smile',
    component: '@/pages/roadmap',
  },
  {
    path: '/tapdx',
    name: 'TAPDX',
    icon: 'smile',
    component: '@/pages/tapdx/fc',
  },
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login/dingtalk',
            component: '@/pages/account/login/dingtalk/DingTalkLogin'
          }
        ]
      },
      { component: './404' }
    ]
  },
  { path: '/', redirect: '/site' },
  { component: './404' },
];
