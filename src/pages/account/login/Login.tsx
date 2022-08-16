/**
 * 登录流程
 * 1. 从服务端获取登录方式
 * 2. 根据登录方式展示对应的页面
 */
import {
    AlipayCircleOutlined,
    LockOutlined,
    MobileOutlined,
    TaobaoCircleOutlined,
    UserOutlined,
    WeiboCircleOutlined,
  } from '@ant-design/icons';
  import { Alert, Tabs } from 'antd';
  import React, { useState } from 'react';
  import { ProFormText, LoginForm } from '@ant-design/pro-form';
  import { history, useModel } from 'umi';
//   import Footer from '@/components/Footer';
//   import { login } from '@/services/ant-design-pro/api';
//   import { getFakeCaptcha } from '@/services/ant-design-pro/login';

  import styles from './index.less';

  const LoginMessage: React.FC<{
    content: string;
  }> = ({ content }) => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );

  const Login: React.FC = () => {
    const [userLoginState, setUserLoginState] = useState({});
    const [type, setType] = useState<string>('account');
    const { initialState, setInitialState } = useModel('@@initialState');


    const fetchUserInfo = async () => {
      const userInfo = await initialState?.fetchUserInfo?.();
      if (userInfo) {
        await setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      }
    };

    // const handleSubmit = async (values: API.LoginParams) => {
    //   try {
    //     // 登录
    //     const msg = await login({ ...values, type });
    //     if (msg.status === 'ok') {
    //       const defaultLoginSuccessMessage = intl.formatMessage({
    //         id: 'pages.login.success',
    //         defaultMessage: '登录成功！',
    //       });
    //       message.success(defaultLoginSuccessMessage);
    //       await fetchUserInfo();
    //       /** 此方法会跳转到 redirect 参数所在的位置 */
    //       if (!history) return;
    //       const { query } = history.location;
    //       const { redirect } = query as { redirect: string };
    //       history.push(redirect || '/');
    //       return;
    //     }
    //     console.log(msg);
    //     // 如果失败去设置用户错误信息
    //     setUserLoginState(msg);
    //   } catch (error) {
    //     const defaultLoginFailureMessage = intl.formatMessage({
    //       id: 'pages.login.failure',
    //       defaultMessage: '登录失败，请重试！',
    //     });
    //     message.error(defaultLoginFailureMessage);
    //   }
    // };
    const { status, type: loginType } = userLoginState;

    return (
      <div className={styles.container}>

        <div className={styles.content}>
          <LoginForm
            logo={<img alt="logo" src="/logo.svg" />}
            title="魔鬼鱼"
            subTitle='技术是第一生产力'
            initialValues={{
              autoLogin: true,
            }}
            // onFinish={async (values) => {
            //   await handleSubmit(values as API.LoginParams);
            // }}
          >
            <Tabs activeKey={type} onChange={setType}>
              <Tabs.TabPane
                key="account"
                tab={'pages.login.accountLogin.tab'}
              />
              <Tabs.TabPane
                key="mobile"
                tab={"手机号登录"}
              />
            </Tabs>

            {status === 'error' && loginType === 'account' && (
              <LoginMessage
                content={"账户或密码错误(admin/ant.design)"}
              />
            )}
            {type === 'account' && (
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={"用户名: admin or user"}
                  rules={[
                    {
                      required: true,
                      message: "请输入用户名!",
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={"密码: ant.design"}
                  rules={[
                    {
                      required: true,
                      message: "请输入密码！",
                    },
                  ]}
                />
              </>
            )}

            {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />}
            {type === 'mobile' && (
              <>
                <ProFormText
                  fieldProps={{
                    size: 'large',
                    prefix: <MobileOutlined className={styles.prefixIcon} />,
                  }}
                  name="mobile"
                  placeholder={"手机号"}
                  rules={[
                    {
                      required: true,
                      message: "请输入手机号！",
                    },
                    {
                      pattern: /^1\d{10}$/,
                      message: "手机号格式错误！",
                    },
                  ]}
                />
                {/* <ProFormCaptcha
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  captchaProps={{
                    size: 'large',
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.captcha.placeholder',
                    defaultMessage: '请输入验证码',
                  })}
                  captchaTextRender={(timing, count) => {
                    if (timing) {
                      return `${count} ${intl.formatMessage({
                        id: 'pages.getCaptchaSecondText',
                        defaultMessage: '获取验证码',
                      })}`;
                    }
                    return intl.formatMessage({
                      id: 'pages.login.phoneLogin.getVerificationCode',
                      defaultMessage: '获取验证码',
                    });
                  }}
                  name="captcha"
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.captcha.required"
                          defaultMessage="请输入验证码！"
                        />
                      ),
                    },
                  ]}
                //   onGetCaptcha={async (phone) => {
                //     const result = await getFakeCaptcha({
                //       phone,
                //     });
                //     if (result === false) {
                //       return;
                //     }
                //     message.success('获取验证码成功！验证码为：1234');
                //   }}
                /> */}
              </>
            )}
          </LoginForm>
        </div>
        {/* <Footer /> */}
      </div>
    );
  };

  export default Login;
