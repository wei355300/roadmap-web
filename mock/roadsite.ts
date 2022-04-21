import { Request, Response } from 'express';

function getDomains(req: Request, res: Response) {
  return res.send({
    code: 0,
    msg: '',
    // data: "WwogIHsKICAgICJuYW1lIjogIui/numUgeS4muWKoeS9k+ezuyIsCiAgICAiZG9tYWlucyI6IFsKICAgICAgewogICAgICAgICJuYW1lIjogIueUn+S6p+eOr+WigyIsCiAgICAgICAgIm1vZHVsZXMiOiBbCiAgICAgICAgICB7CiAgICAgICAgICAgICJuYW1lIjogIui/numUgeeuoeeQhuerryIsCiAgICAgICAgICAgICJsaW5rIjogImh0dHBzOi8vYWRtaW4tY2hhaW4ucGV0a2l0LmNuLyIKICAgICAgICAgIH0sCiAgICAgICAgICB7CiAgICAgICAgICAgICJuYW1lIjogIui/numUgemXqOW6l+erryIsCiAgICAgICAgICAgICJsaW5rIjogImh0dHBzOi8vY2hhaW4ucGV0a2l0LmNuLyIKICAgICAgICAgIH0sCiAgICAgICAgICB7CiAgICAgICAgICAgICJuYW1lIjogIuesrOS4ieaWueS+nei1liIsCiAgICAgICAgICAgICJkZXBzIjogWwogICAgICAgICAgICAgIHsKICAgICAgICAgICAgICAgICJuYW1lIjogIuW+ruS/oeWwj+eoi+W6jyIsCiAgICAgICAgICAgICAgICAiaW5mb3MiOiB7CiAgICAgICAgICAgICAgICAgICLlkI3np7AiOiAiIiwKICAgICAgICAgICAgICAgICAgIuW6lOeUqElkIjogIiIsCiAgICAgICAgICAgICAgICAgICLotJ/otKPkuroiOiAiIgogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIH0sCiAgICAgICAgICAgICAgewogICAgICAgICAgICAgICAgIm5hbWUiOiAi5b6u5L+h5ZWG5oi3IiwKICAgICAgICAgICAgICAgICJpbmZvcyI6IHsKICAgICAgICAgICAgICAgICAgIuWQjeensCI6ICIiLAogICAgICAgICAgICAgICAgICAi5bqU55SoSWQiOiAiIiwKICAgICAgICAgICAgICAgICAgIui0n+i0o+S6uiI6ICIiCiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgfSwKICAgICAgICAgICAgICB7CiAgICAgICAgICAgICAgICAibmFtZSI6ICLlvq7kv6HlhazkvJflj7ciLAogICAgICAgICAgICAgICAgImluZm9zIjogewogICAgICAgICAgICAgICAgICAi5ZCN56ewIjogIiIsCiAgICAgICAgICAgICAgICAgICLlupTnlKhJZCI6ICIiLAogICAgICAgICAgICAgICAgICAi6LSf6LSj5Lq6IjogIiIKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICB9CiAgICAgICAgICAgIF0KICAgICAgICAgIH0KICAgICAgICBdCiAgICAgIH0sCiAgICAgIHsKICAgICAgICAibmFtZSI6ICJVQVTnjq/looMiCiAgICAgIH0sCiAgICAgIHsKICAgICAgICAibmFtZSI6ICLmtYvor5Xnjq/looMiCiAgICAgIH0sCiAgICAgIHsKICAgICAgICAibmFtZSI6ICLlvIDlj5Hnjq/looMiCiAgICAgIH0KICAgIF0KICB9LAogIHsKICAgICJuYW1lIjogIumtlOmsvOmxvEIyQuiuoui0p+W5s+WPsCIsCiAgICAiZG9tYWlucyI6IFsKICAgICAgewogICAgICAgICJuYW1lIjogIueUn+S6p+eOr+WigyIsCiAgICAgICAgIm1vZHVsZXMiOiBbCiAgICAgICAgICB7CiAgICAgICAgICAgICJuYW1lIjogIueuoeeQhuerryIsCiAgICAgICAgICAgICJsaW5rIjogImh0dHBzOi8vYWRtaW4tY2hhaW4ucGV0a2l0LmNuLyIKICAgICAgICAgIH0sCiAgICAgICAgICB7CiAgICAgICAgICAgICJuYW1lIjogIuS+m+W6lOWVhuerryIsCiAgICAgICAgICAgICJsaW5rIjogImh0dHBzOi8vY2hhaW4ucGV0a2l0LmNuLyIKICAgICAgICAgIH0sCiAgICAgICAgICB7CiAgICAgICAgICAgICJuYW1lIjogIumXqOW6l+erryIsCiAgICAgICAgICAgICJsaW5rIjogImh0dHBzOi8vY2hhaW4ucGV0a2l0LmNuLyIKICAgICAgICAgIH0sCiAgICAgICAgICB7CiAgICAgICAgICAgICJuYW1lIjogIuesrOS4ieaWueS+nei1liIsCiAgICAgICAgICAgICJkZXBzIjogWwogICAgICAgICAgICAgIHsKICAgICAgICAgICAgICAgICJuYW1lIjogIuW+ruS/oeWwj+eoi+W6jyIsCiAgICAgICAgICAgICAgICAiaW5mb3MiOiB7CiAgICAgICAgICAgICAgICAgICLlkI3np7AiOiAiIiwKICAgICAgICAgICAgICAgICAgIuW6lOeUqElkIjogIiIsCiAgICAgICAgICAgICAgICAgICLotJ/otKPkuroiOiAiIgogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIH0sCiAgICAgICAgICAgICAgewogICAgICAgICAgICAgICAgIm5hbWUiOiAi5b6u5L+h5ZWG5oi3IiwKICAgICAgICAgICAgICAgICJpbmZvcyI6IHsKICAgICAgICAgICAgICAgICAgIuWQjeensCI6ICIiLAogICAgICAgICAgICAgICAgICAi5bqU55SoSWQiOiAiIiwKICAgICAgICAgICAgICAgICAgIui0n+i0o+S6uiI6ICIiCiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgfSwKICAgICAgICAgICAgICB7CiAgICAgICAgICAgICAgICAibmFtZSI6ICLlvq7kv6HlhazkvJflj7ciLAogICAgICAgICAgICAgICAgImluZm9zIjogewogICAgICAgICAgICAgICAgICAi5ZCN56ewIjogIiIsCiAgICAgICAgICAgICAgICAgICLlupTnlKhJZCI6ICIiLAogICAgICAgICAgICAgICAgICAi6LSf6LSj5Lq6IjogIiIKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICB9CiAgICAgICAgICAgIF0KICAgICAgICAgIH0KICAgICAgICBdCiAgICAgIH0sCiAgICAgIHsKICAgICAgICAibmFtZSI6ICJVQVTnjq/looMiCiAgICAgIH0sCiAgICAgIHsKICAgICAgICAibmFtZSI6ICLmtYvor5Xnjq/looMiCiAgICAgIH0sCiAgICAgIHsKICAgICAgICAibmFtZSI6ICLlvIDlj5Hnjq/looMiCiAgICAgIH0KICAgIF0KICB9LAogIHsKICAgICJuYW1lIjogIuWOn+WKm+eMq0IyQuiuoui0p+W5s+WPsCIsCiAgICAiZG9tYWlucyI6IFsKICAgICAgewogICAgICAgICJuYW1lIjogIueUn+S6p+eOr+WigyIsCiAgICAgICAgIm1vZHVsZXMiOiBbCiAgICAgICAgICB7CiAgICAgICAgICAgICJuYW1lIjogIueuoeeQhuerryIsCiAgICAgICAgICAgICJsaW5rIjogImh0dHBzOi8vYWRtaW4tY2hhaW4ucGV0a2l0LmNuLyIKICAgICAgICAgIH0sCiAgICAgICAgICB7CiAgICAgICAgICAgICJuYW1lIjogIuS+m+W6lOWVhuerryIsCiAgICAgICAgICAgICJsaW5rIjogImh0dHBzOi8vY2hhaW4ucGV0a2l0LmNuLyIKICAgICAgICAgIH0sCiAgICAgICAgICB7CiAgICAgICAgICAgICJuYW1lIjogIumXqOW6l+erryIsCiAgICAgICAgICAgICJsaW5rIjogImh0dHBzOi8vY2hhaW4ucGV0a2l0LmNuLyIKICAgICAgICAgIH0sCiAgICAgICAgICB7CiAgICAgICAgICAgICJuYW1lIjogIuesrOS4ieaWueS+nei1liIsCiAgICAgICAgICAgICJkZXBzIjogWwogICAgICAgICAgICAgIHsKICAgICAgICAgICAgICAgICJuYW1lIjogIuW+ruS/oeWwj+eoi+W6jyIsCiAgICAgICAgICAgICAgICAiaW5mb3MiOiB7CiAgICAgICAgICAgICAgICAgICLlkI3np7AiOiAiIiwKICAgICAgICAgICAgICAgICAgIuW6lOeUqElkIjogIiIsCiAgICAgICAgICAgICAgICAgICLotJ/otKPkuroiOiAiIgogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIH0sCiAgICAgICAgICAgICAgewogICAgICAgICAgICAgICAgIm5hbWUiOiAi5b6u5L+h5ZWG5oi3IiwKICAgICAgICAgICAgICAgICJpbmZvcyI6IHsKICAgICAgICAgICAgICAgICAgIuWQjeensCI6ICIiLAogICAgICAgICAgICAgICAgICAi5bqU55SoSWQiOiAiIiwKICAgICAgICAgICAgICAgICAgIui0n+i0o+S6uiI6ICIiCiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgfSwKICAgICAgICAgICAgICB7CiAgICAgICAgICAgICAgICAibmFtZSI6ICLlvq7kv6HlhazkvJflj7ciLAogICAgICAgICAgICAgICAgImluZm9zIjogewogICAgICAgICAgICAgICAgICAi5ZCN56ewIjogIiIsCiAgICAgICAgICAgICAgICAgICLlupTnlKhJZCI6ICIiLAogICAgICAgICAgICAgICAgICAi6LSf6LSj5Lq6IjogIiIKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICB9CiAgICAgICAgICAgIF0KICAgICAgICAgIH0KICAgICAgICBdCiAgICAgIH0sCiAgICAgIHsKICAgICAgICAibmFtZSI6ICJVQVTnjq/looMiCiAgICAgIH0sCiAgICAgIHsKICAgICAgICAibmFtZSI6ICLmtYvor5Xnjq/looMiCiAgICAgIH0sCiAgICAgIHsKICAgICAgICAibmFtZSI6ICLlvIDlj5Hnjq/looMiCiAgICAgIH0KICAgIF0KICB9LAogIHsKICAgICJuYW1lIjogIuaZuuiDveehrOS7tuS9k+ezuyIsCiAgICAiZG9tYWlucyI6IFsKICAgICAgewogICAgICAgICJuYW1lIjogIueUn+S6p+eOr+WigyIKICAgICAgfSwKICAgICAgewogICAgICAgICJuYW1lIjogIlVBVOeOr+WigyIKICAgICAgfSwKICAgICAgewogICAgICAgICJuYW1lIjogIua1i+ivleeOr+WigyIKICAgICAgfSwKICAgICAgewogICAgICAgICJuYW1lIjogIuW8gOWPkeeOr+WigyIKICAgICAgfQogICAgXQogIH0KXQo=",
    data: [
      {
        name: '连锁业务体系',
        modules: [
          {
            name: '正式',
            child: [
              {
                name: '管理端',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '门店端',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '财务端',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '企业微信',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '微信小程序',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '员工端',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '微信公众号',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '八爪鱼',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: 'Dparse',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '百度统计',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
            ],
          },
          {
            name: 'UAT',
            child: [
              {
                name: '管理端',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '门店端',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '财务端',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '企业微信',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '微信小程序',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '员工端',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '微信公众号',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
            ],
          },
          {
            name: '测试',
            groups: [
              {
                name: '环境一',
                child: [
                  {
                    name: '管理端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '门店端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '财务端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '企业微信',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '微信小程序',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '员工端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '微信公众号',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                ],
              },
              {
                name: '环境二',
                child: [
                  {
                    name: '管理端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '门店端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '财务端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '企业微信',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '微信小程序',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '员工端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '微信公众号',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                ],
              },
            ],
          },
          {
            name: '开发',
            groups: [
              {
                name: '环境一',
                child: [
                  {
                    name: '管理端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '门店端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '财务端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '企业微信',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '微信小程序',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '员工端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '微信公众号',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                ],
              },
              {
                name: '环境二',
                child: [
                  {
                    name: '管理端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '门店端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '财务端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '企业微信',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '微信小程序',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '员工端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '微信公众号',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: '魔鬼鱼B2B订货平台',
        modules: [
          {
            name: '正式',
            child: [
              {
                name: 'B2B管理端',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '门店端',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '财务端',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '企业微信',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '微信小程序',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '员工端',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '微信公众号',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '八爪鱼',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: 'Dparse',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '百度统计',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
            ],
          },
          {
            name: 'UAT',
            child: [
              {
                name: '管理端',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '门店端',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '财务端',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '企业微信',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '微信小程序',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '员工端',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '微信公众号',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
            ],
          },
          {
            name: '测试',
            groups: [
              {
                name: '环境一',
                child: [
                  {
                    name: '管理端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '门店端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '财务端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '企业微信',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '微信小程序',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '员工端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '微信公众号',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                ],
              },
              {
                name: '环境二',
                child: [
                  {
                    name: '管理端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '门店端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '财务端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '企业微信',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '微信小程序',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '员工端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '微信公众号',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                ],
              },
            ],
          },
          {
            name: '开发',
            groups: [
              {
                name: '环境一',
                child: [
                  {
                    name: '管理端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '门店端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '财务端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '企业微信',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '微信小程序',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '员工端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '微信公众号',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                ],
              },
              {
                name: '环境二',
                child: [
                  {
                    name: '管理端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '门店端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '财务端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '企业微信',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '微信小程序',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '员工端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '微信公众号',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: '原力猫B2B订货平台',
        modules: [
          {
            name: '正式',
            child: [
              {
                name: '原力猫B2B管理端',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '门店端',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '财务端',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '企业微信',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '微信小程序',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '员工端',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '微信公众号',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '八爪鱼',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: 'Dparse',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '百度统计',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
            ],
          },
          {
            name: 'UAT',
            child: [
              {
                name: '管理端',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '门店端',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '财务端',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '企业微信',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '微信小程序',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '员工端',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '微信公众号',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
            ],
          },
          {
            name: '测试',
            groups: [
              {
                name: '环境一',
                child: [
                  {
                    name: '管理端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '门店端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '财务端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '企业微信',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '微信小程序',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '员工端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '微信公众号',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                ],
              },
              {
                name: '环境二',
                child: [
                  {
                    name: '管理端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '门店端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '财务端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '企业微信',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '微信小程序',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '员工端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '微信公众号',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                ],
              },
            ],
          },
          {
            name: '开发',
            groups: [
              {
                name: '环境一',
                child: [
                  {
                    name: '管理端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '门店端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '财务端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '企业微信',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '微信小程序',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '员工端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '微信公众号',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                ],
              },
              {
                name: '环境二',
                child: [
                  {
                    name: '管理端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '门店端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '财务端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '企业微信',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '微信小程序',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '员工端',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '微信公众号',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
}

export default {
  'GET /api/git/file/domains.json': getDomains,
};
