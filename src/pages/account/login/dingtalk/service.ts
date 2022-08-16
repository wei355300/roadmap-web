
import {request} from 'umi';

import {DingtalkMetaInfoType} from './data';

enum API {
  DingtalkMetaInfoURL = "/api/base/auth/dingtalk/metainfo"
}

/**
 * 钉钉登录
 * @param options
 * @return 获取用户信息, 包括 访问令牌
 */
// export async function loginByDingTalk(options?: { [key: string]: any }) {
//     return request<{
//         data: User.CurrentUser;
//     }>('/api/user', {
//         method: 'GET',
//         ...(options || {}),
//     });
// }

export async function queryDingtalkMetaInfo(options?: { [key: string]: any }) {
  return request<HttpRes<DingtalkMetaInfoType>>(API.DingtalkMetaInfoURL, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function  queryTokenByRedirectUrl(url: string, options?: {[key: string]: any}) {
  return request<HttpRes<User.Account>>(url, {
    method: 'GET',
    ...(options || {}),
  });
}
