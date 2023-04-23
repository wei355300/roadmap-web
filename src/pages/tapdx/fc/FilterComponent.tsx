import React, { FC, useEffect, useState } from 'react';
import { CalendarTwoTone, InteractionTwoTone, SearchOutlined, FunnelPlotTwoTone } from '@ant-design/icons';
import {
  Row, Col, Descriptions, Checkbox, Cascader, DatePicker, Button, DatePickerProps, Card,
} from 'antd';
import type { Project } from '../data';
import { requestProjects } from '../service';
import { PageHeader } from '@ant-design/pro-layout';

const { RangePicker } = DatePicker;

import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Iteration } from '../data';

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
  const [selectedCascadeOptions, setSelectedCascadeOptions] = useState<CascadeOptionType[]>([]);
  const [conditionalItem, setConditionalItem] = useState<Project>({id: props.project.id, name: props.project.name});

  const onChangeRangePicker: DatePickerProps['onChange'] = (date, dateString) => {
    console.log('onChangeRangePicker', date, dateString);

    let item: Project = {...conditionalItem};

    if (dateString[0]) {
      item['startDate'] = dateString[0];
      item['endDate'] = dateString[1];
    }
    else {
      delete item.startDate;
      delete item.endDate;
    }

    setConditionalItem(item);

    props.setConditional(item);
  };

  const onCheckboxChecked = (checkedValues: CheckboxValueType[]) => {
    console.log("onCheckboxChecked", checkedValues);
    let item = { ...conditionalItem };
    if (!checkedValues || checkedValues.length === 0) {
      delete item.status;
    }
    else {
      item['status'] = checkedValues.map(v=>v + "")
    }
    setConditionalItem(item);
    props.setConditional(item);
  };

  const onCascadeChange = (value: any[], options: any[][]) => {
    console.log('onCascadeChange', value, options);
    let item = { ...conditionalItem };
    let selected: CascadeOptionType[] = [];
    if (!options || options.length === 0) {
      selected = [];
      delete item.iterations;
    }
    else {
      options.forEach(o => {
        selected.push(o[0]);
      });
      const iterations: Iteration[] = [];
      selected.forEach(s => {
        iterations.push({id: s.value});
      });
      item['iterations'] = iterations;
    }
    setSelectedCascadeOptions(selected);
    setConditionalItem(item);
    props.setConditional(item);
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

  const statusOptions = [
    { label: '规划中', value: 'planning' },
    { label: '实现中', value: 'developing' },
    { label: '已实现', value: 'resolved' },
    // { label: '已拒绝', value: 'rejected' },
    // { label: '挂起', value: 'suspended' },
    // { label: '取消', value: 'abandoned' }
  ];

  useEffect(() => {
    convertToCascadeOptions(props.project);
  }, [props.project.id]);

  return (<>
    <Card>
      <Cascader
        style={{ width: 240 }}
        options={cascadeOptions}
        multiple={true}
        onChange={onCascadeChange}
        notFoundContent={'正在加载数据, 稍等!!!'}
      >
        <div>
          <Button type="link" size={"small"} icon={<InteractionTwoTone />} /> 选择迭代
          {selectedCascadeOptions.map(o => {
            return <div key={o.value}>{o.label}</div>
          })}
        </div>
      </Cascader>
    </Card>
    <Card size={"small"}>
      <Button type="link" size={"small"} icon={<CalendarTwoTone />} /> 选择日期
      <RangePicker onChange={(date: any, dateString: any) => onChangeRangePicker(date, dateString)} />
      <br />
      <Button type="link" size={"small"} icon={<FunnelPlotTwoTone />} /> 选择状态
      <Checkbox.Group options={statusOptions} onChange={onCheckboxChecked} />
    </Card>
  </>);
};

const FilterComponent: FC<{doFilter: (query: any) => void}> = (props) => {

  const [projects, setProjects] = useState<Project[]>([]);
  const [checkedOptions, setCheckedOptions] = useState<Project[]>([])
  const [checkboxOptions, setCheckboxOptions] = useState<{label: string, value: string}[]>([])
  const [conditionalItems, setConditionalItems] = useState<Project[]>([]);

  const setConditional = (queryItem: Project) => {

    let items: Project[] = [...conditionalItems];
    const i = items.find(i => i.id === queryItem.id);
    if(!i) {
      items.push(queryItem);
    }
    else {
      items = conditionalItems.map((i) => {
        if(i.id === queryItem.id) {
          return queryItem;
        }
        else {
          return i;
        }
      });
    }
    setConditionalItems(items);
  }

  const onCheckboxChecked = (checkedValues: CheckboxValueType[]) => {
    console.log('onCheckboxChecked', checkedValues);
    if (!checkedValues) {
      setCheckedOptions([]);
      setConditionalItems([]);
    }
    else {
      const options = checkedValues.map(projectId => (
        (projects.find(p => p.id === projectId))!  // ! 表示 non-null assertion
      ));
      setCheckedOptions(options);
      //将un-checked的数据排除
      const items = conditionalItems.filter(q => checkedValues.includes(q.id));
      setConditionalItems(items);
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
    console.log('startQuery', conditionalItems);
    const items = [...conditionalItems];
    props.doFilter(items);
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
    <Card>
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
            <Card>
              <Checkbox.Group options={checkboxOptions} onChange={onCheckboxChecked} />
            </Card>
            <Descriptions column={2} bordered>
              {checkedOptions.map((project) => {
                return <Descriptions.Item label={project.name} key={project.id}>
                  <Conditional project={project} setConditional={setConditional} />
                  <br />
                </Descriptions.Item>
              })}
            </Descriptions>
          </PageHeader>
        </Col>
      </Row>
    </Card>
  </>);
}

export default FilterComponent;
