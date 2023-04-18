import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import { message, notification } from 'antd';
import { RequestOptionsInit } from 'umi-request';
import defaultSettings from '../config/defaultSettings';

import { getLocalAccount } from '@/pages/account/service';
import { RequestConfig } from '@@/plugin-request/request';

const loginPath = '/user/login/dingtalk';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  account?: User.Account;
  getAccount?: () => User.Account | undefined;
}> {
  //如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const account = getLocalAccount();
    return {
      account,
      getAccount: getLocalAccount,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    getAccount: getLocalAccount,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// export function patchRoutes({ routes }: { routes: any[] }) {
//   const rootPath = routes.find((r) => r.path === '/');
//   // rootPath.routes.unshift(DingTalkAuth());
//   rootPath.routes.push({
//     name: 'DingTalk',
//     // icon: 'smile',
//     path: '/dingtalk',
//     routes: [
//       {
//         name: '钉钉',
//         // icon: 'ordered',
//         path: '/dingtalk/auth',
//         component: require('dingtalkauth').default,
//       },
//     ],
//   });
// }

// export function render(oldRender: Function) {
//   oldRender();
// }

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }: any) => {
  return {
    rightContentRender: () => <div />,
    disableContentMargin: false,
    waterMarkProps: {
      content: "Petkit & Mantas",
    },
    // footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.account && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    // links: isDev
    //   ? [
    //       <Link to="/umi/plugin/openapi" target="_blank">
    //         <LinkOutlined />
    //         <span>OpenAPI 文档</span>
    //       </Link>,
    //       <Link to="/~docs">
    //         <BookOutlined />
    //         <span>业务组件文档</span>
    //       </Link>,
    //     ]
    //   : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};


const codeMessage: any = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const responseStatusErrorHandler = (response: Response, options: any) => {

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    // 如果是 401 状态码, 标识登录标识过期, 不弹框提示, 而是直接跳转回登录页面
    if (response.status !== 401) {
      message.error({
        content: `请求错误 ${status}: ${url}`,
        duration: 1,
        // description: errorText,
      });
    }
    else {
      message.error({
        content: `登录过期, 请重新登录`,
        duration: 1,
      });
      //未登录, 或登录过期, 跳转到登录页面
      history.push(loginPath)
    }
  }

  if (response.statusText === 'BizError') {
    notification.warning({
      message: `操作错误`,
      description: response.statusText,
    });
  }
  else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

//所有以 /api 开头的请求, 如果存在账号数据, 则都携带上Token参数
const tokenRequestInterceptor = (url: string, options: RequestOptionsInit) => {
  if (url.startsWith('/api')) {
    const account = getLocalAccount();
    if (account) {
      const tokenHeader = { Token: account?.token };
      return {
        url: `${url}`,
        options: { ...options, interceptors: true, headers: tokenHeader },
      }
    }
  }
  return {
    url, options
  }
}

// type ResponseStructure = {
//   code: number,
//   msg: string,
//   data: any
// } | {
//   status: number,
//   statusText: string
// };

// https://umijs.org/zh-CN/plugins/plugin-request
export const request: RequestConfig = {

  errorConfig: {
    errorHandler(error: any, opts: any){
      responseStatusErrorHandler(error.response, opts);
    },
    errorThrower(){
      console.log('errorThrower');
    }
  },
  // errorHandler : (err) => {console.log("errorHandler", err)},

  //请求加拦截器, 除了login接口外, 统一从currentUser中将token带上
  requestInterceptors: [ tokenRequestInterceptor ],
};
