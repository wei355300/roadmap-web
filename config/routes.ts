export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user', routes: [{ name: '登录', path: '/user/login', component: './user/Login' }] },
      { component: './404' },
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      { path: '/admin/sub-page', name: '二级管理页', icon: 'smile', component: './Welcome' },
      { component: './404' },
    ],
  },
  { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  // {
  //   name: 'TAPD',
  //   icon: 'project',
  //   path: '/worker',
  //   component: './worker/board',
  //   routes: [
  //     {
  //       name: '项目任务',
  //       icon: 'ordered',
  //       path: '/worker/board',
  //       component: './worker/board',
  //     },
  //     {
  //       name: '设置',
  //       icon: 'setting',
  //       path: '/worker/setting',
  //       redirect: '/404',
  //       // component: './worker/setting',
  //     }
  //   ]
  // },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];
