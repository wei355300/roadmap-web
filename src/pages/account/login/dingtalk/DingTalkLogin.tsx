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
import React, { useEffect, useState } from 'react';
import {useModel, history} from 'umi';
import { ProFormText, LoginForm } from '@ant-design/pro-form';
import { Space, Typography } from 'antd';
//   import Footer from '@/components/Footer';
//   import { login } from '@/services/ant-design-pro/api';
//   import { getFakeCaptcha } from '@/services/ant-design-pro/login';

import {queryDingtalkMetaInfo, queryTokenByRedirectUrl} from './service';
import {saveLocalAccount} from '@/pages/account/service';
import {DingtalkMetaInfoType} from './data';

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


  //
  // 1. 获取钉钉的配置信息, 显示钉钉二维码
  // 2. 扫码登录, 获取token及账号信息
  // 3. 登录成功转向主页

  const buildDingtalkFrame = (metaInfo: DingtalkMetaInfoType) => {
    const redirectUri = win.location.protocol + "//" + win.location.host + "" + metaInfo.redirectUri;
    console.log('redirect_uri', redirectUri);
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
        console.log('loginResult:', loginResult);

        const { redirectUrl, authCode, state } = loginResult;
        // 这里可以直接进行重定向
        console.log('loginResult', loginResult);

        //直接跳转到 redirect_uri,
        //window.location.href = redirectUrl;

        // 也可以在不跳转页面的情况下，使用code进行授权
        //调用服务端接口, 获取 token, 并跳转到 主页
        console.log(authCode);

        queryTokenByRedirectUrl(redirectUrl, {authCode: authCode})
          .then((res: HttpRes<User.Account>) => {
            console.log("获取token结果:", res)
            //保存账号信息到本地
            // setAccount(res.data);
            saveLocalAccount(res.data);
            setInitialState((s) => ({...s, account: res.data})).then(() => {
              //登录成功后, 跳转到首页
              history.push("/");
            });
          })
          .catch((err: any) => {
            console.log("获取token失败:", err)
          });
      },
      (errorMsg: any) => {
        console.log('errorMsg', errorMsg);
        // 这里一般需要展示登录失败的具体原因
        alert(`Login Error---: ${errorMsg}`);
      },
    );
  }

  useEffect(() => {
    //获取钉钉的配置
    //获取成功后, 渲染钉钉二维码

    queryDingtalkMetaInfo()
      .then((res: HttpRes<DingtalkMetaInfoType>) => {
        console.log("获取钉钉配置信息-http:", res)
        return res.data;
      })
      .then((data: DingtalkMetaInfoType) => {
        console.log("获取钉钉配置信息-meta:", data)
        buildDingtalkFrame(data)
      })
      .catch((err: any) => {
        console.log("获取钉钉配置信息失败:", err)
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
