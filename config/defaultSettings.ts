import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} =
  {
    navTheme: 'light',
    primaryColor: '#1890ff',
    layout: 'top',
    contentWidth: 'Fluid',
    fixedHeader: true,
    fixSiderbar: true,
    pwa: false,
    logo: '/logo.svg',
    headerHeight: 48,
    splitMenus: false,
    footerRender: false,
  };

export default Settings;
