import React, { FC, useEffect, useState } from 'react';
import { requestProjects } from '@/pages/zentao/service';
import { Button, Card, Col, Descriptions, Row } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import { SearchOutlined } from '@ant-design/icons';
import { Iterations } from '@/pages/zentao/component/Iteration';
import { CheckCard } from '@ant-design/pro-card';
import { CheckCardOptionType, CheckGroupValueType } from '@ant-design/pro-card/es/components/CheckCard/Group';
import { Execution, FilterItems } from '@/pages/zentao/data';

type FilterProps = {
  ztToken: string;
  setFilter: (query: FilterItems) => void;
}


export const Filter: FC<FilterProps> = (props) => {

  const [projectOptions, setProjectOptions] = useState<CheckCardOptionType[]>([]);
  const [checkedProjects, setCheckedProjects] = useState<CheckCardOptionType[]>([]);
  const [filterItems, setFilterItems] = useState<FilterItems>();

  useEffect(() => {
    requestProjects().then(res => {
      const projects = res.data;
      setProjectOptions(projects.map(p => ({ label: p.name, value: p.id, title: p.name })));
    });
  }, []);

  const onClickSearchBtn = () => {
    if (filterItems) {
      console.log('onClickSearchBtn', filterItems);
      props.setFilter(filterItems);
    } else {
      // todo 提示 未选择任何项目
      console.log('onClickSearchBtn', '提示 未选择任何项目');
    }
  };

  const onProjectsChecked = (checkedValues: CheckGroupValueType) => {
    const checkedProjects: CheckCardOptionType[] = [];
    if (checkedValues && Array.isArray(checkedValues)) {
      checkedValues.forEach(checkedValue => {
        checkedProjects.push(projectOptions.find(p => p.value === checkedValue) as CheckCardOptionType);
      });
    }
    setCheckedProjects(checkedProjects);

    const v: FilterItems = {};
    const pre: FilterItems = filterItems ? filterItems : {};
    checkedProjects.forEach(project => {
      if(pre[project.value as string]) {
        v[project.value as string] = (pre[project.value as string]);
      }
    });
    setFilterItems(v);



    // //将取消选择的项目从filterItems中移除
    // let items = { ...filterItems };
    // if (!checkedProjects || checkedProjects.length === 0) {
    //   items = {};
    // } else {
    //   // 保留 items 中 与 checkedProject 相同的项
    //   const n = Object.keys(items).reduce((acc, key: string) => {
    //     if (!(key in items)) {
    //       acc[key] = items[key];
    //     }
    //     return acc;
    //   }, {} as FilterItems);
    //   console.log('n', n);
    //   items = {...n, ...items};
    // }
    // console.log('pro', items);
    // setFilterItems(items);
  };

  const onIterationChange = (projectId: string, executions: Execution[]) => {
    const items = { ...filterItems };
    if(!executions || executions.length === 0) {
      delete items[projectId];
    }
    else {
      items[projectId] = executions;
    }
    setFilterItems(items);
  };

  return (
    <>
      <Card>
        <Row>
          <Col span={24}>
            <PageHeader
              ghost={false}
              backIcon={false}
              title={'选择项目'}
              extra={[
                <Button
                  key='search'
                  type='primary'
                  icon={<SearchOutlined />}
                  onClick={onClickSearchBtn}
                >
                  {' '}
                  搜索{' '}
                </Button>,
              ]}
            >
              <>
                <CheckCard.Group
                  size='small'
                  multiple={true}
                  options={projectOptions}
                  onChange={onProjectsChecked}
                />
              </>
              <Descriptions column={2} bordered>
                {checkedProjects.map((checkedOption) => (
                    <Descriptions.Item label={checkedOption.title} key={checkedOption.value as string}>
                      <div style={{ width: '500px', maxWidth: '800px', minWidth: '400px' }}>
                        <Iterations ztToken={props.ztToken}
                                    projectId={checkedOption.value as string}
                                    onChange={onIterationChange} />
                      </div>
                    </Descriptions.Item>
                  ),
                )}
              </Descriptions>
            </PageHeader>
          </Col>
        </Row>
      </Card>
    </>
  );
};
