import { Request, Response } from 'express';

function getDomains(req: Request, res: Response) {
  return res.send({
    code: 0,
    msg: '',
    // data: "WwogIHsKICAgICJuYW1lIjogIui/numUgeS4muWKoeS9k+ezuyIsCiAgICAiZG9tYWlucyI6IFsKICAgICAgewogICAgICAgICJuYW1lIjogIueUn+S6p+eOr+WigyIsCiAgICAgICAgIm1vZHVsZXMiOiBbCiAgICAgICAgICB7CiAgICAgICAgICAgICJuYW1lIjogIui/numUgeeuoeeQhuerryIsCiAgICAgICAgICAgICJsaW5rIjogImh0dHBzOi8vYWRtaW4tY2hhaW4ucGV0a2l0LmNuLyIKICAgICAgICAgIH0sCiAgICAgICAgICB7CiAgICAgICAgICAgICJuYW1lIjogIui/numUgemXqOW6l+erryIsCiAgICAgICAgICAgICJsaW5rIjogImh0dHBzOi8vY2hhaW4ucGV0a2l0LmNuLyIKICAgICAgICAgIH0sCiAgICAgICAgICB7CiAgICAgICAgICAgICJuYW1lIjogIuesrOS4ieaWueS+nei1liIsCiAgICAgICAgICAgICJkZXBzIjogWwogICAgICAgICAgICAgIHsKICAgICAgICAgICAgICAgICJuYW1lIjogIuW+ruS/oeWwj+eoi+W6jyIsCiAgICAgICAgICAgICAgICAiaW5mb3MiOiB7CiAgICAgICAgICAgICAgICAgICLlkI3np7AiOiAiIiwKICAgICAgICAgICAgICAgICAgIuW6lOeUqElkIjogIiIsCiAgICAgICAgICAgICAgICAgICLotJ/otKPkuroiOiAiIgogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIH0sCiAgICAgICAgICAgICAgewogICAgICAgICAgICAgICAgIm5hbWUiOiAi5b6u5L+h5ZWG5oi3IiwKICAgICAgICAgICAgICAgICJpbmZvcyI6IHsKICAgICAgICAgICAgICAgICAgIuWQjeensCI6ICIiLAogICAgICAgICAgICAgICAgICAi5bqU55SoSWQiOiAiIiwKICAgICAgICAgICAgICAgICAgIui0n+i0o+S6uiI6ICIiCiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgfSwKICAgICAgICAgICAgICB7CiAgICAgICAgICAgICAgICAibmFtZSI6ICLlvq7kv6HlhazkvJflj7ciLAogICAgICAgICAgICAgICAgImluZm9zIjogewogICAgICAgICAgICAgICAgICAi5ZCN56ewIjogIiIsCiAgICAgICAgICAgICAgICAgICLlupTnlKhJZCI6ICIiLAogICAgICAgICAgICAgICAgICAi6LSf6LSj5Lq6IjogIiIKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICB9CiAgICAgICAgICAgIF0KICAgICAgICAgIH0KICAgICAgICBdCiAgICAgIH0sCiAgICAgIHsKICAgICAgICAibmFtZSI6ICJVQVTnjq/looMiCiAgICAgIH0sCiAgICAgIHsKICAgICAgICAibmFtZSI6ICLmtYvor5Xnjq/looMiCiAgICAgIH0sCiAgICAgIHsKICAgICAgICAibmFtZSI6ICLlvIDlj5Hnjq/looMiCiAgICAgIH0KICAgIF0KICB9LAogIHsKICAgICJuYW1lIjogIumtlOmsvOmxvEIyQuiuoui0p+W5s+WPsCIsCiAgICAiZG9tYWlucyI6IFsKICAgICAgewogICAgICAgICJuYW1lIjogIueUn+S6p+eOr+WigyIsCiAgICAgICAgIm1vZHVsZXMiOiBbCiAgICAgICAgICB7CiAgICAgICAgICAgICJuYW1lIjogIueuoeeQhuerryIsCiAgICAgICAgICAgICJsaW5rIjogImh0dHBzOi8vYWRtaW4tY2hhaW4ucGV0a2l0LmNuLyIKICAgICAgICAgIH0sCiAgICAgICAgICB7CiAgICAgICAgICAgICJuYW1lIjogIuS+m+W6lOWVhuerryIsCiAgICAgICAgICAgICJsaW5rIjogImh0dHBzOi8vY2hhaW4ucGV0a2l0LmNuLyIKICAgICAgICAgIH0sCiAgICAgICAgICB7CiAgICAgICAgICAgICJuYW1lIjogIumXqOW6l+erryIsCiAgICAgICAgICAgICJsaW5rIjogImh0dHBzOi8vY2hhaW4ucGV0a2l0LmNuLyIKICAgICAgICAgIH0sCiAgICAgICAgICB7CiAgICAgICAgICAgICJuYW1lIjogIuesrOS4ieaWueS+nei1liIsCiAgICAgICAgICAgICJkZXBzIjogWwogICAgICAgICAgICAgIHsKICAgICAgICAgICAgICAgICJuYW1lIjogIuW+ruS/oeWwj+eoi+W6jyIsCiAgICAgICAgICAgICAgICAiaW5mb3MiOiB7CiAgICAgICAgICAgICAgICAgICLlkI3np7AiOiAiIiwKICAgICAgICAgICAgICAgICAgIuW6lOeUqElkIjogIiIsCiAgICAgICAgICAgICAgICAgICLotJ/otKPkuroiOiAiIgogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIH0sCiAgICAgICAgICAgICAgewogICAgICAgICAgICAgICAgIm5hbWUiOiAi5b6u5L+h5ZWG5oi3IiwKICAgICAgICAgICAgICAgICJpbmZvcyI6IHsKICAgICAgICAgICAgICAgICAgIuWQjeensCI6ICIiLAogICAgICAgICAgICAgICAgICAi5bqU55SoSWQiOiAiIiwKICAgICAgICAgICAgICAgICAgIui0n+i0o+S6uiI6ICIiCiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgfSwKICAgICAgICAgICAgICB7CiAgICAgICAgICAgICAgICAibmFtZSI6ICLlvq7kv6HlhazkvJflj7ciLAogICAgICAgICAgICAgICAgImluZm9zIjogewogICAgICAgICAgICAgICAgICAi5ZCN56ewIjogIiIsCiAgICAgICAgICAgICAgICAgICLlupTnlKhJZCI6ICIiLAogICAgICAgICAgICAgICAgICAi6LSf6LSj5Lq6IjogIiIKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICB9CiAgICAgICAgICAgIF0KICAgICAgICAgIH0KICAgICAgICBdCiAgICAgIH0sCiAgICAgIHsKICAgICAgICAibmFtZSI6ICJVQVTnjq/looMiCiAgICAgIH0sCiAgICAgIHsKICAgICAgICAibmFtZSI6ICLmtYvor5Xnjq/looMiCiAgICAgIH0sCiAgICAgIHsKICAgICAgICAibmFtZSI6ICLlvIDlj5Hnjq/looMiCiAgICAgIH0KICAgIF0KICB9LAogIHsKICAgICJuYW1lIjogIuWOn+WKm+eMq0IyQuiuoui0p+W5s+WPsCIsCiAgICAiZG9tYWlucyI6IFsKICAgICAgewogICAgICAgICJuYW1lIjogIueUn+S6p+eOr+WigyIsCiAgICAgICAgIm1vZHVsZXMiOiBbCiAgICAgICAgICB7CiAgICAgICAgICAgICJuYW1lIjogIueuoeeQhuerryIsCiAgICAgICAgICAgICJsaW5rIjogImh0dHBzOi8vYWRtaW4tY2hhaW4ucGV0a2l0LmNuLyIKICAgICAgICAgIH0sCiAgICAgICAgICB7CiAgICAgICAgICAgICJuYW1lIjogIuS+m+W6lOWVhuerryIsCiAgICAgICAgICAgICJsaW5rIjogImh0dHBzOi8vY2hhaW4ucGV0a2l0LmNuLyIKICAgICAgICAgIH0sCiAgICAgICAgICB7CiAgICAgICAgICAgICJuYW1lIjogIumXqOW6l+erryIsCiAgICAgICAgICAgICJsaW5rIjogImh0dHBzOi8vY2hhaW4ucGV0a2l0LmNuLyIKICAgICAgICAgIH0sCiAgICAgICAgICB7CiAgICAgICAgICAgICJuYW1lIjogIuesrOS4ieaWueS+nei1liIsCiAgICAgICAgICAgICJkZXBzIjogWwogICAgICAgICAgICAgIHsKICAgICAgICAgICAgICAgICJuYW1lIjogIuW+ruS/oeWwj+eoi+W6jyIsCiAgICAgICAgICAgICAgICAiaW5mb3MiOiB7CiAgICAgICAgICAgICAgICAgICLlkI3np7AiOiAiIiwKICAgICAgICAgICAgICAgICAgIuW6lOeUqElkIjogIiIsCiAgICAgICAgICAgICAgICAgICLotJ/otKPkuroiOiAiIgogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIH0sCiAgICAgICAgICAgICAgewogICAgICAgICAgICAgICAgIm5hbWUiOiAi5b6u5L+h5ZWG5oi3IiwKICAgICAgICAgICAgICAgICJpbmZvcyI6IHsKICAgICAgICAgICAgICAgICAgIuWQjeensCI6ICIiLAogICAgICAgICAgICAgICAgICAi5bqU55SoSWQiOiAiIiwKICAgICAgICAgICAgICAgICAgIui0n+i0o+S6uiI6ICIiCiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgfSwKICAgICAgICAgICAgICB7CiAgICAgICAgICAgICAgICAibmFtZSI6ICLlvq7kv6HlhazkvJflj7ciLAogICAgICAgICAgICAgICAgImluZm9zIjogewogICAgICAgICAgICAgICAgICAi5ZCN56ewIjogIiIsCiAgICAgICAgICAgICAgICAgICLlupTnlKhJZCI6ICIiLAogICAgICAgICAgICAgICAgICAi6LSf6LSj5Lq6IjogIiIKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICB9CiAgICAgICAgICAgIF0KICAgICAgICAgIH0KICAgICAgICBdCiAgICAgIH0sCiAgICAgIHsKICAgICAgICAibmFtZSI6ICJVQVTnjq/looMiCiAgICAgIH0sCiAgICAgIHsKICAgICAgICAibmFtZSI6ICLmtYvor5Xnjq/looMiCiAgICAgIH0sCiAgICAgIHsKICAgICAgICAibmFtZSI6ICLlvIDlj5Hnjq/looMiCiAgICAgIH0KICAgIF0KICB9LAogIHsKICAgICJuYW1lIjogIuaZuuiDveehrOS7tuS9k+ezuyIsCiAgICAiZG9tYWlucyI6IFsKICAgICAgewogICAgICAgICJuYW1lIjogIueUn+S6p+eOr+WigyIKICAgICAgfSwKICAgICAgewogICAgICAgICJuYW1lIjogIlVBVOeOr+WigyIKICAgICAgfSwKICAgICAgewogICAgICAgICJuYW1lIjogIua1i+ivleeOr+WigyIKICAgICAgfSwKICAgICAgewogICAgICAgICJuYW1lIjogIuW8gOWPkeeOr+WigyIKICAgICAgfQogICAgXQogIH0KXQo=",
    data: [
      {
        name: '??????????????????',
        modules: [
          {
            name: '??????',
            child: [
              {
                name: '?????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '?????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '?????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '????????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '???????????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '?????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '???????????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '?????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: 'Dparse',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '????????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
            ],
          },
          {
            name: 'UAT',
            child: [
              {
                name: '?????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '?????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '?????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '????????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '???????????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '?????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '???????????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
            ],
          },
          {
            name: '??????',
            groups: [
              {
                name: '?????????',
                child: [
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '???????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '???????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                ],
              },
              {
                name: '?????????',
                child: [
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '???????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '???????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                ],
              },
            ],
          },
          {
            name: '??????',
            groups: [
              {
                name: '?????????',
                child: [
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '???????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '???????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                ],
              },
              {
                name: '?????????',
                child: [
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '???????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '???????????????',
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
        name: '?????????B2B????????????',
        modules: [
          {
            name: '??????',
            child: [
              {
                name: 'B2B?????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '?????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '?????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '????????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '???????????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '?????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '???????????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '?????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: 'Dparse',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '????????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
            ],
          },
          {
            name: 'UAT',
            child: [
              {
                name: '?????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '?????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '?????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '????????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '???????????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '?????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '???????????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
            ],
          },
          {
            name: '??????',
            groups: [
              {
                name: '?????????',
                child: [
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '???????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '???????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                ],
              },
              {
                name: '?????????',
                child: [
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '???????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '???????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                ],
              },
            ],
          },
          {
            name: '??????',
            groups: [
              {
                name: '?????????',
                child: [
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '???????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '???????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                ],
              },
              {
                name: '?????????',
                child: [
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '???????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '???????????????',
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
        name: '?????????B2B????????????',
        modules: [
          {
            name: '??????',
            child: [
              {
                name: '?????????B2B?????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '?????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '?????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '????????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '???????????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '?????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '???????????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '?????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: 'Dparse',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '????????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
            ],
          },
          {
            name: 'UAT',
            child: [
              {
                name: '?????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '?????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '?????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '????????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '???????????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '?????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
              {
                name: '???????????????',
                link: 'https://admin-chain.petkit.cn/',
                img: '',
              },
            ],
          },
          {
            name: '??????',
            groups: [
              {
                name: '?????????',
                child: [
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '???????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '???????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                ],
              },
              {
                name: '?????????',
                child: [
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '???????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '???????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                ],
              },
            ],
          },
          {
            name: '??????',
            groups: [
              {
                name: '?????????',
                child: [
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '???????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '???????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                ],
              },
              {
                name: '?????????',
                child: [
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '???????????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '?????????',
                    link: 'https://admin-chain.petkit.cn/',
                    img: '',
                  },
                  {
                    name: '???????????????',
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
