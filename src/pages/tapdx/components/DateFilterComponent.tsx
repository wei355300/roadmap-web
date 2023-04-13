import React, {FC, useState, useEffect} from 'react';

import {
  Button,
  // Space,
  Cascader,
  // Form,
  PageHeader,
  Descriptions,
  // Row, Col
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type {Project, FilterChangedAction} from '../data'

interface DateFilterComponentPropsType {
  //父子组建通信: 修改过滤条件后, 通过该回调将参数传递给父组件
  changedAction: FilterChangedAction;
  projects: Project[];
}

interface DateFilterComponentStateType {
  selectedProjects?: Project[];
  // projects?: Project[];
  filterProjectOptions?: any[];
}

class DateFilterComponent extends React.Component<DateFilterComponentPropsType, DateFilterComponentStateType> {
  constructor(props: DateFilterComponentPropsType) {
    super(props);
    console.log("DateFilterComponent", props);
    this.state = {
      // projects: props.projects
    };
  }

  componentDidMount() {
    console.log("DateFilterComponent-componentDidMount", this.props.projects);
    if(this.props.projects.length || 0 > 0) {
      this.convertToFilterOptions(this.props.projects || []);
    }
  }

  convertToFilterOptions = (projects: Project[]) => {
    // this.setState({ projects: projects });
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
      p.roles?.forEach((r) => {
        roleChildren.push({ value: r.id, label: r.name, type: 'r' });
      });
      p.iterations?.forEach((i) => {
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
      this.setState({ selectedProjects: [] });
      return;
    }
    const selectedProjectValues: Project[] = [];
    const projectQueries = this.props.projects || [];
    values.forEach((v) => {
      const selectedProject = projectQueries.find((p) => p.id === v[0]);
      if (!selectedProject) {
        return;
      }
      //填充project
      const selectedQuery: Project = {
        id: selectedProject.id,
        name: selectedProject.name,
        roles: [],
        iterations: [],
      };

      //填充 roles 字段的值, 如果未匹配, 则默认全填 project 里的 roles
      const selectedRole = selectedProject.roles?.find((r) => r.id === v[2]);
      if (selectedRole) {
        selectedQuery.roles?.push(selectedRole);
      } else {
        selectedQuery.roles = selectedProject.roles;
      }

      //填充 iterations 字段的值, 如果未匹配, 则默认全填 project 里的 iterations
      const selectedIteration = selectedProject.iterations?.find((i) => i.id === v[1]);
      if (selectedIteration) {
        selectedQuery.iterations?.push(selectedIteration);
      } else {
        selectedQuery.iterations = selectedProject.iterations;
      }

      selectedProjectValues.push(selectedQuery);
    });

    this.setState({ selectedProjects: selectedProjectValues });
  };

  submitQuery = () => {
    //最终需要上报的过滤条件, 不由表格的 form 值构成, 而是由 state 中的 selectedProjects 决定
    // 参考: #onChange() 的逻辑
    // this.props.onQuery(this.state.selectedQueries);
  };

  projectCascade = () => {
    return <Cascader
        style={{ width: 240 }}
        options={this.state.filterProjectOptions}
        multiple={true}
        onChange={this.onCascadeChange}
        notFoundContent={'正在加载数据, 稍等!!!'}
      >
        <a href="#">选择项目</a>
      </Cascader>
  };

  render() {
    return <>
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            ghost={false}
            backIcon={false}
            title={'项目(时间范围)'}
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
            <Descriptions size="small" column={1}>
              {this.state.selectedProjects?.map((p, i) => {
                return (
                  <Descriptions.Item label={p.name} key={i}>
                    {p.iterations && p.iterations[0]?.name}
                    <br />
                  </Descriptions.Item>
                );
              })}
            </Descriptions>
          </PageHeader>
        </div>
      </>
  }
}

export default DateFilterComponent;

export const DateFilterComponent2: FC<DateFilterComponentPropsType> = (props) => {
  const [selectedProjects, setSelectedProjects] = useState<Project[]>([]);
  // const [filterProjectOptions, setFilterProjectOptions] = useState<any[]>([]);

  const  convertToFilterOptions = (projects: Project[]) => {
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
      p.roles?.forEach((r) => {
        roleChildren.push({ value: r.id, label: r.name, type: 'r' });
      });
      p.iterations?.forEach((i) => {
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
    console.log("DateFilterComponent2-convertToFilterOptions", projectOptions);
    // setFilterProjectOptions(projectOptions);
    // console.log("DateFilterComponent2-convertToFilterOptions", filterProjectOptions);
    return projectOptions;
  };

  const onCascadeChange = (values: any[][]) => {
    if (!values || values.length === 0) {
      setSelectedProjects([]);
      return;
    }
    const selectedProjectValues: Project[] = [];
    const projectQueries = props.projects || [];
    values.forEach((v) => {
      const selectedProject = projectQueries.find((p) => p.id === v[0]);
      if (!selectedProject) {
        return;
      }
      //填充project
      const selectedQuery: Project = {
        id: selectedProject.id,
        name: selectedProject.name,
        roles: [],
        iterations: [],
      };

      //填充 roles 字段的值, 如果未匹配, 则默认全填 project 里的 roles
      const selectedRole = selectedProject.roles?.find((r) => r.id === v[2]);
      if (selectedRole) {
        selectedQuery.roles?.push(selectedRole);
      } else {
        selectedQuery.roles = selectedProject.roles;
      }

      //填充 iterations 字段的值, 如果未匹配, 则默认全填 project 里的 iterations
      const selectedIteration = selectedProject.iterations?.find((i) => i.id === v[1]);
      if (selectedIteration) {
        selectedQuery.iterations?.push(selectedIteration);
      } else {
        selectedQuery.iterations = selectedProject.iterations;
      }

      selectedProjectValues.push(selectedQuery);
    });

    setSelectedProjects(selectedProjectValues);
  };

  const submitQuery = () => {
    //最终需要上报的过滤条件, 不由表格的 form 值构成, 而是由 state 中的 selectedProjects 决定
    // 参考: #onChange() 的逻辑
    // this.props.onQuery(this.state.selectedQueries);
  };

  const projectCascade = () => {
    return (
      <Cascader
        style={{ width: 240 }}
        options={convertToFilterOptions(props.projects)}
        multiple={true}
        onChange={onCascadeChange}
        notFoundContent={'正在加载数据, 稍等!!!'}
      >
        <a href="#">选择项目</a>
      </Cascader>
    );
  };

  useEffect(() => {
    convertToFilterOptions(props.projects);
  }, []);


  // setFilterProjectOptions(convertToFilterOptions(props.projects));


  return <>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          backIcon={false}
          title={'项目(时间范围)'}
          subTitle={projectCascade}
          extra={[
            <Button
              key="search"
              type="primary"
              icon={<SearchOutlined />}
              onClick={submitQuery}
            >
              搜  索
            </Button>,
          ]}
        >
          <Descriptions size="small" column={1}>
            {selectedProjects.map((p, i) => {
              return <Descriptions.Item label={p.name} key={i}>
                  {p.iterations && p.iterations[0]?.name}
                  <br />
                </Descriptions.Item>
            })}
          </Descriptions>
        </PageHeader>
      </div>
    </>
};
