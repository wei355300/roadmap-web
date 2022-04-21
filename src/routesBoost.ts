export const tapdXRoute = () => {
  return {
    name: 'TapdX',
    // icon: 'smile',
    path: '/tapdx',
    routes: [
      {
        name: '项目任务',
        // icon: 'ordered',
        path: '/tapdx/project/task',
        component: require('tapdx').default,
      },
    ],
  };
};
