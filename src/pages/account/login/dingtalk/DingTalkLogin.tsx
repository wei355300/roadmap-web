/**
 * 钉钉登录流程
 * 1. 从服务端获取配置信息
 * 2. 跳转到钉钉登录页面 or 显示钉钉二维码
 * 3. 登录成功跳转主页
 * 4. 登录失败跳转失败页面
 *
 * 内嵌 钉钉登录二维码 的形式:
 * https://open.dingtalk.com/document/orgapp-server/obtain-identity-credentials
 *
 *
 */
import React, { useEffect } from 'react';
import { history, useModel } from 'umi';
import { LoginForm } from '@ant-design/pro-form';
import { notification, Typography } from 'antd';

import { queryDingtalkMetaInfo, queryTokenByRedirectUrl } from './service';
import { saveLocalAccount, updateToken } from '@/pages/account/service';
import { DingtalkMetaInfoType } from './data';

import styles from './index.less';


const { Text } = Typography;

/**
 * 钉钉扫码登录
 * 参考: 获取登录用户的访问凭证(https://open.dingtalk.com/document/orgapp-server/obtain-identity-credentials)
 *
 */
const DingTalkLogin: React.FC = () => {

  const { initialState, setInitialState } = useModel('@@initialState');

  //在 config.ts中配置 'ddlogin.js', 加载 需要的script (参考 config.ts 的 headScripts 配置)
  const win: any = window;
  const DTFrameLogin = win.DTFrameLogin;

  const updateLocalAccount = (account: User.Account) => {
    saveLocalAccount(account);
  }

  const handleLoginSuccess = (account: User.Account) => {
    updateLocalAccount(account);
  }

  const updateTokenExpiration = async (account: User.Account) => {
    const expiration = Date.parse(account.expiration);
    //如果token的效期太短(少于3天), 需要更新token效期
    if(expiration.valueOf() - Date.now().valueOf() < 3*24*60*60*1000) {
      const newAccount = await updateToken();
      updateLocalAccount(newAccount.data);
      return newAccount.data;
    }
    return account;
  }

  const handleDingtalkSuccess = (redirectUrl: string, authCode: string) => {
    //直接跳转到 redirect_uri,
    //window.location.href = redirectUrl;

    // 也可以在不跳转页面的情况下，使用code进行授权
    //调用服务端接口, 获取 token, 并跳转到 主页

    queryTokenByRedirectUrl(redirectUrl, {authCode: authCode})
      .then((res: HttpRes<User.Account>) => {
        //保存账号信息到本地
        const account = res.data;
        handleLoginSuccess(account);
        return account;
      })
      .then((account: User.Account) => {
        return updateTokenExpiration(account);
      })
      .then((account: User.Account) => {
        setInitialState((s) => ({...s, account: account})).then(() => {
          //登录成功后, 跳转到首页
          history.push("/");
        });
      })
      .catch((err: any) => {
        console.log("获取token失败:", err)
      });
  }

  //
  // 1. 获取钉钉的配置信息, 显示钉钉二维码
  // 2. 扫码登录, 获取token及账号信息
  // 3. 登录成功转向主页

  const buildDingtalkFrame = (metaInfo: DingtalkMetaInfoType) => {
    let redirectUri = win.location.protocol + "//" + win.location.host + "" + metaInfo.redirectUri;
    console.log("metaInfo", metaInfo);
    // redirectUri = "https://dev-roadmap.petkit.com/api/auth/dingtalk/callback";
    DTFrameLogin(
      {
        id: 'self_defined_element',
        width: 300,
        height: 300,
      },
      {
        //从钉钉获取authentication_code后的回调接口, 通过该接口, 从服务器获取账号信息及token
        redirect_uri: encodeURIComponent(redirectUri),
        client_id: metaInfo.clientId,
        scope: metaInfo.scope,
        response_type: metaInfo.responseType,
        state: 'state',
        prompt: metaInfo.prompt,
      },
      (loginResult: any) => {
        console.log('loginResult', loginResult);
        // const { redirectUrl, authCode, state } = loginResult;
        const { redirectUrl, authCode } = loginResult;
        handleDingtalkSuccess(redirectUrl, authCode);
      },
      (errorMsg: any) => {
        console.log('errorMsg', errorMsg);
        // 这里一般需要展示登录失败的具体原因
        // alert(`Login Error---: ${errorMsg}`);
        notification.error({
          message: `操作错误`,
          description: `${errorMsg}`,
        });
      },
    );
  }

  useEffect(() => {
    if(initialState?.account) {}
    queryDingtalkMetaInfo()
      .then((res: HttpRes<DingtalkMetaInfoType>) => {
        return res.data;
      })
      .then((data: DingtalkMetaInfoType) => {
        buildDingtalkFrame(data)
      })
      .catch((err: any) => {
        console.log("获取钉钉配置信息失败:", err);
        notification.error({
          message: `系统错误`,
          description: '获取钉钉配置信息失败',
        });
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt='logo' src='/logo.svg' />}
          title='魔鬼鱼'
          subTitle='技术是第一生产力'
          submitter={false}
        >
          <div id={'self_defined_element'} style={{ textAlign: 'center' }} />
          <div style={{ textAlign: 'center' }}>
            <Text>请使用钉钉扫码登录</Text>
          </div>
        </LoginForm>
      </div>
    </div>
  );
};
export default DingTalkLogin;
