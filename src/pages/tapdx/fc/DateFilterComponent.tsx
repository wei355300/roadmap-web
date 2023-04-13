import {FC, useState, useEffect} from 'react';

import {
  // Button,
  // Space,
  // DatePicker,
  Cascader,
  // Form,
  PageHeader,
  // Descriptions,
  // Row, Col
} from 'antd';

// import { SearchOutlined } from '@ant-design/icons';
import type {Project} from '../data'


// const { RangePicker } = DatePicker;

interface DateFilterComponentPropsType {
  //父子组建通信: 修改过滤条件后, 通过该回调将参数传递给父组件
  changedAction: (data: Project[]) => void;
  projects: Project[];
}


type CascadeOptionType = {
  label: string;
  value: string;
  type: string;
}

const DateFilterComponent: FC<DateFilterComponentPropsType> = (props) => {
  // const [selectedProjects, setSelectedProjects] = useState<Project[]>([]);
  const [filterOptions, setFilterOptions] = useState<CascadeOptionType[]>([]);
  const [cascadeOpen, setCascadeOpen] = useState(false);

  // const ProjectDatePicker: FC = () => {
  //   return (<>选择日期: <RangePicker /></>);
  // }

  const convertToFilterOptions = (projects: Project[]) => {
    const projectOptions: any = [];

    projects.forEach((p) => {
      const option = {
        value: p.id,
        label: p.name,
        type: 'p',
      };
      projectOptions.push(option);
    });
    setFilterOptions(projectOptions);
  };

  const onCascadeChange = (values: any[]) => {
    setCascadeOpen(false);
    if (!values || values.length === 0) {
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
      };

      selectedProjectValues.push(selectedQuery);
    });

    props.changedAction(selectedProjectValues);
  };

  const ProjectCascade: FC = () => (
    <Cascader
      style={{ width: 240 }}
      options={filterOptions}
      multiple={true}
      onChange={onCascadeChange}
      open={cascadeOpen}
      notFoundContent={'正在加载数据, 稍等!!!'}
    >
      <a href="#">选择项目</a>
    </Cascader>
  );

  useEffect(() => {
    convertToFilterOptions(props.projects);
  }, [props.projects]);

  return <>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          backIcon={false}
          title={'项目(时间范围)'}
          subTitle={<ProjectCascade />}
        >
        </PageHeader>
      </div>
    </>
};

export default DateFilterComponent;
