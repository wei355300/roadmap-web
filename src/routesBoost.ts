export const tapdXRoute = () => {
  return {
    name: 'TapdX',
    icon: 'table',
    path: '/x',
    routes: [
      {
        name: '项目任务',
        icon: 'ordered',
        path: '/x/tapdx',
        component: require('tapdx-npm').default,
      },
    ],
  };
};
