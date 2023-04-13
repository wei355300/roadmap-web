
import {request} from 'umi';


export async function getLocalAccountAsync() {
  return new Promise<User.Account>(() => {
    const account = localStorage.getItem('account');
    if (!account) {
      return undefined;
    }
    return JSON.parse(account);
  });
}

export function getLocalAccount(): User.Account | undefined {

  const account = localStorage.getItem('account');
  if (!account) {
    return undefined;
  }
  return JSON.parse(account);
}

export function saveLocalAccount(account: User.Account) {
  localStorage.setItem('account', JSON.stringify(account));
}

/**
 * 更新Token及效期
 * @param options
 */
export async function updateToken() {
  return request<{
    data: User.Account;
  }>('/api/account/token', {
    method: 'POST'
  });
}
