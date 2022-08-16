import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import './styles.less';

import { Result } from 'antd';

import { requestContent } from './service';
import { SiteType } from './data';
import CardComponent from './components/CardComponent';

interface SiteRoadPropsType {}

interface SiteRoadStateType {
  domains?: any;
  tabActiveKey?: string;
  tabList?: any[];
  tabContent?: any;
  loading: boolean;
}

class SiteRoadComponent extends React.Component<SiteRoadPropsType, SiteRoadStateType> {
  constructor(props: SiteRoadPropsType) {
    super(props);
    this.state = {
      // tabActiveKey: '原力猫B2B订货平台',
      // tabList: []
      loading: true,
    };
  }

  componentDidMount() {
    requestContent("domains.json").then((res) => {
      console.log(res);
      const domains = JSON.parse(Buffer.from(res.data, 'base64').toString('utf-8'));
      // requestDomains2().then((res) => {
      // const domains = res.data;
      console.log('domains', domains);
      const tabList = this.tabList(domains);
      const tabContent = this.tabContent(domains);
      // console.log("tabActiveKey:", tabList[0].key);
      this.setState({
        domains: domains,
        tabList: tabList,
        tabContent: tabContent,
        tabActiveKey: tabList[0].key,
        loading: false,
      });
    });
  }

  onTabChange = (key: string) => {
    this.setState({ tabActiveKey: key });
    console.log('onTabChange', key);
  };

  tabContent = (domains: SiteType[]) => {
    const content = {};
    domains.forEach((domain) => {
      content[domain.name] = <CardComponent key={domain.name} data={domain || {}} />;
    });
    return content;
  };

  tabList = (domains: SiteType[]) => {
    return domains.map((domain) => ({
      tab: domain.name,
      key: domain.name,
    }));
  };

  NoDataResult = (<Result status="warning" title="没有数据展示, 请检查错误原因!" />);

  render() {
    //https://charts.ant.design/zh/examples/relation-graph/flow-analysis-graph#basic
    //使用图表展示关系
    return (
      <>
        <PageContainer
          fixedHeader
          tabList={this.state.tabList}
          tabProps={{ type: 'card', size: 'large' }}
          onTabChange={this.onTabChange}
          loading={this.state.loading}
          tabActiveKey={this.state.tabActiveKey}
        >
          {this.state.tabActiveKey && this.state.tabContent
            ? this.state.tabContent[this.state.tabActiveKey]
            : this.NoDataResult}
        </PageContainer>
      </>
    );
  }
}

export default SiteRoadComponent;
