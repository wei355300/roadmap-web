import { ProLayoutProps } from '@ant-design/pro-components';

const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  'navTheme': 'light',
  'colorPrimary': '#1890ff',
  'layout': 'top',
  'contentWidth': 'Fluid',
  'fixedHeader': false,
  'fixSiderbar': true,
  'pwa': true,
  'logo': '/logo.svg',
  'token': {},
  'splitMenus': false,
  'footerRender': false,
  'title': 'Roadmap',
};
export default Settings;
