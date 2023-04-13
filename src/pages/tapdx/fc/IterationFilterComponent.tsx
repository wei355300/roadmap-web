import { FC, useEffect, useState } from 'react';
import {
  Cascader,
  PageHeader,
} from 'antd';
import type { Project } from '../data';

interface IterationFilterComponentPropsType {
  //父子组建通信: 修改过滤条件后, 通过该回调将参数传递给父组件
  changedAction: (data: Project[]) => void;
  projects: Project[];
}

interface CascadeOptionType {
  label: string;
  value: string;
  type: string;
  startDate?: string;
  endDate?: string;
  children?: CascadeOptionType[];
}

const IterationFilterComponent: FC<IterationFilterComponentPropsType> = (props) => {
  const [selectedOptions, setSelectedOptions] = useState<Project[]>([]);
  const [filterOptions, setFilterOptions] = useState<CascadeOptionType[]>([]);

  const convertToFilterOptions = (projects: Project[]) => {
    const projectOptions: CascadeOptionType[] = [];

    projects.forEach((p) => {
      const iterationChildren: CascadeOptionType[] = [];
      const roleChildren: CascadeOptionType[] = [];
      const option: CascadeOptionType = {
        value: p.id,
        label: p.name,
        type: 'p',
        children: iterationChildren,
      };
      p.roles?.forEach((r) => {
        roleChildren.push({ value: r.id, label: r.name, type: 'r' });
      });
      p.iterations?.forEach((i) => {
        const iterationChildrenItem: CascadeOptionType = {
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
    setFilterOptions(projectOptions);
  };

  const onCascadeChange = (values: any[], selectOptions: any[]) => {
    if (!values || values.length === 0) {
      return;
    }
    const selectedOptionValues: Project[] = [];
    values.forEach((v) => {
      const selectedProject = props.projects.find((p) => p.id === v[0]);
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

      selectedOptionValues.push(selectedQuery);
    });
    // setSelectedOptions(selectedOptionValues);
    props.changedAction(selectedOptionValues);

    // ((v) => {
    //   console.log("auto");
    //   setSelectedOptions(v);
    //   // props.changedAction(v);
    // })(selectedOptionValues);
  };

  const onDropdownVisibleChange = (values: boolean) => {
    console.log('onDropdownVisibleChange', values);
    if (!values) {
      props.changedAction(selectedOptions);
    }
  }

  useEffect(() => {
    convertToFilterOptions(props.projects);
  }, [props.projects]);

  const ProjectCascade: FC = () => {
    return (
      <Cascader
        style={{ width: 240 }}
        options={filterOptions}
        multiple={true}
        onChange={(v,s) => onCascadeChange(v,s)}
        notFoundContent={'正在加载数据, 稍等!!!'}
        // onDropdownVisibleChange={onDropdownVisibleChange}
      >
        <a href='#'>选择项目</a>
      </Cascader>
    );
  };

  return (
    <>
      <div className='site-page-header-ghost-wrapper'>
        <PageHeader
          ghost={false}
          backIcon={false}
          title={'项目(迭代)'}
          subTitle={<ProjectCascade />}
        />
      </div>
    </>
  );
};

export default IterationFilterComponent;
