
import {request} from 'umi';


export function getLocalAccount(): User.Account | undefined {

  const account = localStorage.getItem('account');
  if (!account) {
    return undefined;
  }
  return JSON.parse(account);
    // return request<{
    //     data: User.CurrentUser;
    // }>('/api/user', {
    //     method: 'GET',
    // });
}

export function saveLocalAccount(account: User.Account) {
  localStorage.setItem('account', JSON.stringify(account));
}

/**
 * 更新Token及效期
 * @param options
 */
export async function updateToken(options: {token: string}) {
  return request<{
    data: User.Account;
  }>('/api/account/token', {
    method: 'POST',
    ...(options || {}),
  });
}
