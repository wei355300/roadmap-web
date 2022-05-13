import React from 'react';
import {
  Button,
  // Space,
  Cascader,
  // Form,
  PageHeader,
  Descriptions,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ProjectQueryType } from '../data';
import { requestProjects } from '../service';

interface FilterComponentPropsType {
  //父子组建通信: 修改过滤条件后, 通过该回调将参数传递给父组件
  onQuery: Function;
}

interface FilterComponentStateType {
  selectedQueries?: ProjectQueryType[];
  projects?: ProjectQueryType[];
  filterProjectOptions?: any[];
}

class FilterComponent extends React.Component<FilterComponentPropsType, FilterComponentStateType> {
  constructor(props: FilterComponentPropsType) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    requestProjects().then((res) => {
      this.convertToFilterOptions(res.data);
    });
  }

  convertToFilterOptions = (projects: ProjectQueryType[]) => {
    this.setState({ projects: projects });
    const projectOptions: any = [];

    projects.forEach((p) => {
      const option = {
        value: p.id,
        label: p.name,
        type: 'p',
        children: [],
      };
      const iterationChildren: any = [];
      const roleChildren: any = [];
      p.roles.forEach((r) => {
        roleChildren.push({ value: r.id, label: r.name, type: 'r' });
      });
      p.iterations.forEach((i) => {
        const iterationChildrenItem = {
          value: i.id,
          label: i.name + '[' + i.startDate + '~' + i.endDate + ']',
          type: 'i',
          children: roleChildren,
          startDate: i.startDate,
          endDate: i.endDate,
        };
        iterationChildren.push(iterationChildrenItem);
      });
      option.children = iterationChildren;
      projectOptions.push(option);
    });
    this.setState({
      filterProjectOptions: projectOptions,
    });
  };

  /**
   * @param values 是多维数组
   *  第一维是项目, 第二维是迭代,第三维是角色(依赖的 UI 选择的层级数据)
   *  最后一维如果没有, 则表示为全选,
   *  例: 仅二维数组: ['id', 'id'], 表示选择了项目+迭代, 而角色为全选
   */
  onCascadeChange = (values: any[][]) => {
    if (!values || values.length === 0) {
      this.setState({ selectedQueries: [] });
      return;
    }
    const selectedProjectValues: ProjectQueryType[] = [];
    const projectQueries = this.state.projects || [];
    values.forEach((v) => {
      const selectedProject = projectQueries.find((p) => p.id === v[0]);
      if (!selectedProject) {
        return;
      }
      //填充project
      const selectedQuery: ProjectQueryType = {
        id: selectedProject.id,
        name: selectedProject.name,
        roles: [],
        iterations: [],
      };

      //填充 roles 字段的值, 如果未匹配, 则默认全填 project 里的 roles
      const selectedRole = selectedProject.roles.find((r) => r.id === v[2]);
      if (selectedRole) {
        selectedQuery.roles.push(selectedRole);
      } else {
        selectedQuery.roles = selectedProject.roles;
      }

      //填充 iterations 字段的值, 如果未匹配, 则默认全填 project 里的 iterations
      const selectedIteration = selectedProject.iterations.find((i) => i.id === v[1]);
      if (selectedIteration) {
        selectedQuery.iterations.push(selectedIteration);
      } else {
        selectedQuery.iterations = selectedProject.iterations;
      }

      selectedProjectValues.push(selectedQuery);
    });

    this.setState({ selectedQueries: selectedProjectValues });
  };

  submitQuery = () => {
    //最终需要上报的过滤条件, 不由表格的 form 值构成, 而是由 state 中的 selectedProjects 决定
    // 参考: #onChange() 的逻辑
    this.props.onQuery(this.state.selectedQueries);
  };

  projectCascade = () => {
    return (
      <Cascader
        style={{ width: 240 }}
        options={this.state.filterProjectOptions}
        multiple={true}
        onChange={this.onCascadeChange}
        notFoundContent={'正在加载数据, 稍等!!!'}
      >
        <a href="#">选择项目</a>
      </Cascader>
    );
  };

  render() {
    return (
      <>
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            ghost={false}
            backIcon={false}
            title={'项目'}
            subTitle={this.projectCascade()}
            extra={[
              <Button
                key="search"
                type="primary"
                icon={<SearchOutlined />}
                onClick={this.submitQuery}
              >
                {' '}
                搜索{' '}
              </Button>,
            ]}
          >
            <Descriptions size="small" column={3}>
              {this.state.selectedQueries?.map((v, i) => {
                return (
                  <Descriptions.Item label={v.name} key={i}>
                    {v.iterations[0].name}
                    <br />
                  </Descriptions.Item>
                );
              })}
            </Descriptions>
          </PageHeader>
        </div>
      </>
    );
  }
}

export default FilterComponent;
