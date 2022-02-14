import { Request, Response } from 'express';

function getBoardListData(req: Request, res: Response) {
  // const { projects, roles } = req.body;
  console.log('getBoardListData');
  // console.log('roles', roles);
  res.send({
    code: 0,
    data: [
      {
        id: '1001',
        name: '张三',
        role: '研发',
        traces: [
          {
            id: 'story_1',
            type: 'story',
            link: 'http://www.baidu.com',
            weight: 100,
            name: '这是一个开发 story1这是一个开发 story1这是一个开发 story1',
          },
          {
            id: 'story_2',
            type: 'task',
            link: 'http://www.baidu.com',
            weight: 100,
            name: '这是一个开发 story2',
          },
          {
            id: 'story_3',
            type: 'bug',
            link: 'http://www.baidu.com',
            weight: 100,
            name: '这是一个开发 story3',
          },
        ],
      },
      {
        id: '1002',
        name: '李四',
        role: '测试',
        traces: [
          {
            id: 'bug_1',
            type: 'bug',
            link: 'http://www.baidu.com',
            weight: 90,
            name: '这是一个测试  bug1',
          },
          {
            id: 'bug_2',
            type: 'bug',
            link: 'http://www.baidu.com',
            weight: 90,
            name: '这是一个测试  bug12',
          },
        ],
      },
      {
        id: '1003',
        name: '李1',
        role: '测试',
        traces: [
          {
            id: 'bug_31',
            type: 'bug',
            link: 'http://www.baidu.com',
            weight: 90,
            name: '这是一个测试  bug31',
          },
          {
            id: 'bug_32',
            type: 'bug',
            link: 'http://www.baidu.com',
            weight: 90,
            name: '这是一个测试  bug32',
          },
        ],
      },
      {
        id: '1004',
        name: '李2',
        role: '测试',
        traces: [
          {
            id: 'bug_41',
            type: 'bug',
            link: 'http://www.baidu.com',
            weight: 90,
            name: '这是一个测试  bug41',
          },
          {
            id: 'bug_42',
            type: 'bug',
            link: 'http://www.baidu.com',
            weight: 90,
            name: '这是一个测试  bug42',
          },
        ],
      },
      {
        id: '1005',
        name: '李3',
        role: '测试',
        traces: [
          {
            id: 'bug_51',
            type: 'bug',
            link: 'http://www.baidu.com',
            weight: 90,
            name: '这是一个测试  bug51',
          },
          {
            id: 'bug_52',
            type: 'bug',
            link: 'http://www.baidu.com',
            weight: 90,
            name: '这是一个测试  bug52',
          },
        ],
      },
      {
        id: '1006',
        name: '李4',
        role: '测试',
        traces: [
          // {
          //     id: "bug_61",
          //     type: "bug",
          //     link: "http://www.baidu.com",
          //     weight:90,
          //     name: "这是一个测试  bug"
          // },
          // {
          //     id: "bug_62",
          //     type: "bug",
          //     link: "http://www.baidu.com",
          //     weight:90,
          //     name: "这是一个测试  bug2"
          // }
        ],
      },
      {
        id: '1007',
        name: '李7',
        role: '测试',
        traces: [],
      },
      {
        id: '1008',
        name: '李8',
        role: '测试',
        traces: [],
      },
      {
        id: '1009',
        name: '李9',
        role: '测试',
        traces: [],
      },
      {
        id: '10010',
        name: '李10',
        role: '测试',
        traces: [],
      },
    ],
  });
}

function putOrder(req: Request, res: Response) {
  return res.send({ code: 0 });
}

function getProjects(req: Request, res: Response) {
  return res.send({
    code: 0,
    data: [
      {
        id: '64372788',
        name: '项目一',
        iterations: [
          {
            id: '1164372788001000968',
            name: '迭代一',
          },
          {
            id: '11643727880010009681',
            name: '迭代二',
          },
        ],
        roles: [
          {
            id: '1164372788001000036',
            name: '前端',
          },
          {
            id: '116437278800100003611',
            name: '后端',
          },
        ],
      },
      {
        id: '64372789',
        name: '项目二(假的)',
        iterations: [
          {
            id: '1164372788001000969',
            name: '迭代二',
          },
          {
            id: '116437278800100096822',
            name: '迭代二-1',
          },
        ],
        roles: [
          {
            id: '1164372788001000037',
            name: '前端',
          },
        ],
      },
    ],
  });
}

function getTraces(req: Request, res: Response) {
  return res.send({
    code: 0,
    msg: '',
    data: [
      {
        user: '宋aa',
        name: '',
        email: null,
        roles: [
          '1000000000000000002',
          '1122259671001000010',
          '1122259671001000008',
          '1122259671001000052',
        ],
        traces: [
          {
            id: '1122259671001047689',
            name: '【门店星级添加门店编号字段】客户服务统计页面，接口/api/admin/store-star/customservice/list返回serialNumber为空',
            type: 'bug',
            link: 'https://www.tapd.cn/22259671/bugtrace/bugs/view?bug_id=1122259671001047689',
            weight: 0,
            done: false,
            projectId: 22259671,
            iterationId: '1122259671001001084',
          },
        ],
      },
      {
        user: '孟bb',
        name: '',
        email: '',
        roles: [
          '1000000000000000089',
          '1122259671001000008',
          '1122259671001000012',
          '1122259671001000019',
        ],
        traces: [
          {
            id: '1122259671001047689',
            name: '【门店星级添加门店编号字段】客户服务统计页面，接口/api/admin/store-star/customservice/list返回serialNumber为空',
            type: 'bug',
            link: 'https://www.tapd.cn/22259671/bugtrace/bugs/view?bug_id=1122259671001047689',
            weight: 0,
            done: false,
            projectId: 22259671,
            iterationId: '1122259671001001084',
          },
        ],
      },
    ],
  });
}

export default {
  'GET /api/worker/board/list': getBoardListData,
  'GET /api/tapd/worker/board/projects': getProjects,
  'PUT /api/worker/board/order': putOrder,
  'POST /api/tapd/worker/board/traces': getTraces,
};
