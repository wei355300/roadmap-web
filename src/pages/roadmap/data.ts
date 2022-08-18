export type ModuleItemType = {
  name: string;
  text: string;
  link: string;
  img: string;
  imgFile: string;
  desc: {};
};

export type ModuleChildType = {
  name: string;
  child: ModuleItemType[];
};

export type ModuleGroupType = {
  name: string;
  child: ModuleChildType[];
};

export interface ModuleType {
  name: string;
  child?: ModuleChildType[];
  groups?: ModuleGroupType[];
}

export interface SiteType {
  name: string;
  modules?: ModuleType[];
}

// export interface SiteResType {
//   code: number;
//   msg: string;
//   data: string
// }

export const flowAnalysisGraphData = (data: any) => {
  return {
    nodes: [
      {
        id: '0',
        value: {
          title: '原力猫-供应商平台',
        },
      },
      {
        id: '-1',
        value: {
          title: '订货商城',
          items: [
            {
              text: 'https://mall.mantas.cn/b2b/b2b/index',
            },
          ],
        },
      },
      {
        id: '-2',
        value: {
          title: '管理端',
          items: [
            {
              text: 'https://mall-admin.mantas.cn/',
            },
          ],
        },
      },
      {
        id: '-3',
        value: {
          title: '供应商端',
          items: [
            {
              text: 'https://supplier.petkit.cn/',
            },
          ],
        },
      },
      {
        id: '4',
        value: {
          title: '微信订货小程序',
          items: [
            {
              text: '小程序二维码',
            },
          ],
        },
      },
      {
        id: '5',
        value: {
          title: '微信公众号',
          items: [
            {
              text: '公共号二维码',
            },
          ],
        },
      },
      {
        id: '6',
        value: {
          title: '企业微信',
          items: [
            {
              text: '企业微信二维码',
            },
          ],
        },
      },
    ],
    edges: [
      {
        source: '-1',
        target: '0',
      },
      {
        source: '-2',
        target: '0',
      },
      {
        source: '-3',
        target: '0',
      },
      {
        source: '0',
        target: '4',
      },
      {
        source: '0',
        target: '5',
      },
      {
        source: '0',
        target: '6',
      },
    ],
  };
};

export const flowAnalysisGraphConfig = (data: any) => {
  return {
    data: data,
    nodeCfg: {
      size: [200, 25],
      items: {
        containerStyle: {
          fill: '#fff',
        },
        padding: 6,
        style: (cfg: any, group: any, type: any) => {
          const styles = {
            icon: {
              width: 12,
              height: 12,
            },
            value: {
              fill: '#f00',
            },
            text: {
              fill: '#aaa',
            },
          };
          return styles[type];
        },
      },
      nodeStateStyles: {
        hover: {
          stroke: '#1890ff',
          lineWidth: 2,
        },
      },
    },
    edgeCfg: {
      label: {
        style: {
          fill: '#aaa',
          fontSize: 12,
          fillOpacity: 1,
        },
      },
      style: (edge: any) => {
        const stroke = edge.target === '0' ? '#c86bdd' : '#5ae859';
        return {
          stroke,
          lineWidth: Math.random() * 10 + 1,
          strokeOpacity: 0.5,
        };
      },
      edgeStateStyles: {
        hover: {
          strokeOpacity: 1,
        },
      },
    },
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
    onReady: (graph: any) => {
      graph.on('node:click', (evt: any) => {
        window.open(evt.item._cfg.model.value.items[0].text, '_blank');
      });
    },
  };
};
