/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { account?: User.Account | undefined }) {
  const { account } = initialState || {};
  const nothing = {
    c: account
  }
  return {
    // canAdmin: currentUser && currentUser.access === 'admin',
    canAdmin: nothing && true,
  };
}
