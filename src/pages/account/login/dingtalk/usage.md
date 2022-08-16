

# 内嵌钉钉二维码登录

[参考](https://open.dingtalk.com/document/orgapp-server/obtain-identity-credentials)

# 登录第三方网站

在自己的网站上, 跳转到钉钉的登录/扫码页面, 后再回调到自己的网站

[参考](https://open.dingtalk.com/document/orgapp-server/tutorial-obtaining-user-personal-information)

# 测试

通过frp的内网穿透能力, 验证钉钉二维码的获取与展示

注意 frp 的服务端 与 客户端 的配置

## 测试方法

在浏览器上打开
```
http://auth-dingtalk-demo.mantas.cn:11080/user/login/dingtalk
```
