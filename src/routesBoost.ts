// export const tapdXRoute = () => {
//   return {
//     name: 'TapdX',
//     // icon: 'smile',
//     path: '/tapdx',
//     routes: [
//       {
//         name: '项目任务',
//         // icon: 'ordered',
//         path: '/tapdx/project/task',
//         component: require('tapdx').default,
//       },
//     ],
//   };
// };

export const DingTalkAuth = () => {
  return {
    name: 'DingTalk',
    // icon: 'smile',
    path: '/dingtalk',
    routes: [
      {
        name: '钉钉',
        // icon: 'ordered',
        path: '/dingtalk/auth',
        component: require('dingtalkauth').default,
      },
    ],
  };
};
