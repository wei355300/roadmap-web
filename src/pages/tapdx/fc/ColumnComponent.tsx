/**
 * 使用 栅格列表(antd) 的形式展示队列信息
 */
import React, { FC, useEffect, useState } from 'react';
import { Card, Tabs } from 'antd';
import type {TabsProps} from 'antd';
import type { TraceDataType, Project } from '../data';
import { requestWorkerTraceData } from '../service';
import DropColumnComponent from './DropColumnComponent';
import GanttColumnComponent from './GanttColumnComponent';

const ColumnComponent: FC<{query: Project[]}> = (props) => {

  const [loading, setLoading] = useState<boolean>(true);
  const [originTasks, setOriginTasks] = useState<TraceDataType[]>([]);

  const requestColumnData = (query: Project[]) => {
    if (!query || query.length === 0) {
      setLoading(false);
      return;
    }
    setLoading(true);
    requestWorkerTraceData(query)
      .then((res) => {
        if (res.data) {
          setOriginTasks(res.data);
        }
      })
      .catch((error) => {
        console.log('requestWorkerTraceData error', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    requestColumnData(props.query)
  }, [props.query]);

  const selectedTab = (key: string) => {
    console.log(key);
  };

  const tabItems: TabsProps['items'] = [
    {
      key: 'task_list',
      label: `任务列表`,
      children: <DropColumnComponent tasks={originTasks} /> ,
    },
    {
      key: 'gantt',
      label: `甘特图`,
      children: <GanttColumnComponent tasks={originTasks} /> ,
    }
  ];

  return (
    <>
      <Card loading={loading}>
        <Tabs defaultActiveKey="1" items={tabItems} onChange={selectedTab} />
      </Card>
    </>
  );
};

export default ColumnComponent;
