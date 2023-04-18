import React, { FC, useEffect, useState } from 'react';
import { CalendarTwoTone, InteractionTwoTone, SearchOutlined } from '@ant-design/icons';
import {
  Row, Col, Descriptions, Checkbox, Cascader, DatePicker, Button, DatePickerProps
} from 'antd';
import type { Project } from '../data';
import { requestProjects } from '../service';
import { PageHeader } from '@ant-design/pro-layout';

const { RangePicker } = DatePicker;

import type { CheckboxValueType } from 'antd/es/checkbox/Group';

type CascadeOptionType = {
  label: string;
  value: string;
  type?: string;
  startDate?: string;
  endDate?: string;
  children?: CascadeOptionType[];
}

const Conditional: FC<{project: Project, setConditional: (data: Project)=>void}> = (props) => {
  const [cascadeOptions, setCascadeOptions] = useState<CascadeOptionType[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<CascadeOptionType[]>([]);

  const onClickRangePicker: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
    props.setConditional({
      id: props.project.id,
      name: props.project.name,
      startDate: dateString[0],
      endDate: dateString[1],
    });
  };

  const onCascadeChange = (value: any[], options: any[][]) => {

    let selected: CascadeOptionType[] = [];
    if (!options || options.length === 0) {
      selected = [];
    }
    else {
      options.forEach(o => {
        selected.push(o[0]);
      });
    }
    setSelectedOptions(selected);

    const queryItem: Project = {
      id: props.project.id,
      name: props.project.name,
      iterations: []
    };
    selected.forEach(s => {
      queryItem.iterations?.push({id: s.value});
    });
    props.setConditional(queryItem);
  }

  const convertToCascadeOptions = (p: Project) => {
    const iterationChildren: CascadeOptionType[] = [];
    p.iterations?.forEach((i) => {
      const iterationChildrenItem: CascadeOptionType = {
        value: i.id,
        label: i.name + '[' + i.startDate + '~' + i.endDate + ']',
        type: 'i',
        children: [],
        startDate: i.startDate,
        endDate: i.endDate,
      };
      iterationChildren.push(iterationChildrenItem);
    });
    setCascadeOptions(iterationChildren);
  };

  useEffect(() => {
    convertToCascadeOptions(props.project);
  }, [props.project]);

  return (<>
    <Cascader
      style={{ width: 240 }}
      options={cascadeOptions}
      multiple={true}
      onChange={onCascadeChange}
      notFoundContent={'正在加载数据, 稍等!!!'}
    >
      <div>
        <Button type="link" size={"small"} icon={<InteractionTwoTone />} /> 选择迭代
        {selectedOptions.map(o => {
          return <div key={o.value}>{o.label}</div>
        })}
      </div>
    </Cascader>
    <div>
      <br />
      <Button type="link" size={"small"} icon={<CalendarTwoTone />} /> 选择日期
      <RangePicker onChange={(date: any, dateString: any) => onClickRangePicker(date, dateString)} />
    </div>
  </>);
};

const FilterComponent: FC<{doFilter: (query: any) => void}> = (props) => {

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<Project[]>([])
  const [checkboxOptions, setCheckboxOptions] = useState<{label: string, value: string}[]>([])
  const [queryItems, setQueryItems] = useState<Project[]>([]);

  const setConditional = (queryItem: Project) => {
    let items: Project[] = [...queryItems];
    const i = items.find(i => i.id === queryItem.id);
    if(!i) {
      items.push(queryItem);
    }
    else {
      items = queryItems.map((i) => {
        if(i.id === queryItem.id) {
          return queryItem;
        }
        else {
          return i;
        }
      });
    }
    console.log('setConditional', items);
    setQueryItems(items);
  }

  const onCheckboxChecked = (checkedValues: CheckboxValueType[]) => {
    if (!checkedValues) {
      setSelectedProjects([]);
    }
    else {
      const options = checkedValues.map(projectId => (
        (projects.find(p => p.id === projectId))!  // ! 表示 non-null assertion
      ));
      setSelectedProjects(options);
    }
  };

  const convertToCheckboxOptions = (projects: Project[]) => {
    let projectOptions = projects.map(p => ({
      label: p.name,
      value: p.id
    }));
    setCheckboxOptions(projectOptions);
  }

  const startQuery = () => {
    console.log('startQuery', queryItems);
    props.doFilter(queryItems);
  };

  useEffect(() => {
    requestProjects().then((res) => {
      if(res.data && res.data.length > 0 ) {
        setProjects(res.data);
        convertToCheckboxOptions(res.data);
      }
    });
  }, []);

  return (<>
    <Row>
      <Col span={24}>
        <PageHeader
          ghost={false}
          backIcon={false}
          title={'选择项目'}
          extra={[
            <Button
              key="search"
              type="primary"
              icon={<SearchOutlined />}
              onClick={startQuery}
            >
              {' '}
              搜索{' '}
            </Button>,
          ]}
        >
          <Checkbox.Group options={checkboxOptions} onChange={onCheckboxChecked} />
          <Descriptions column={2} bordered>
            {selectedProjects.map((project) => {
              return <Descriptions.Item label={project.name} key={project.id}>
                <Conditional project={project} setConditional={setConditional} />
                <br />
              </Descriptions.Item>
            })}
          </Descriptions>
        </PageHeader>
      </Col>
    </Row>
  </>);
}

export default FilterComponent;
