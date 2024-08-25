/**
 * 使用 栅格列表(antd) 的形式展示队列信息
 */
import React, { FC, useEffect, useState } from 'react';
import Empty from 'antd/es/empty/empty';
import ProCard from '@ant-design/pro-card';
import { FilterItems, GroupTasksType, Task, TaskResponse } from '@/pages/zentao/data';
import { requestTasks } from '@/pages/zentao/service';
import { Tasks } from '@/pages/zentao/component/Task';
import { Col, Row } from 'antd';

export type PanelProps = {
  ztToken: string;
  query?: FilterItems;
};

export const Panel: FC<PanelProps> = (props) => {

  const [loading, setLoading] = useState<boolean>(true);
  const [groupTasks, setGroupTasks] = useState<GroupTasksType>();

  // 按被分配的人分组
  const groupTasksByAssigned = (tasks: Task[]) => {
    let gTasks: GroupTasksType = {};
    tasks.forEach((task) => {
      const assigned: string = task.assignedTo?.realname || '';
      if (!gTasks[assigned]) {
        gTasks[assigned] = [];
      }
      gTasks[assigned].push(task);
    });

    // 将 gTasks 安装 executions 的长度, 重新排序
    const sortedByTasks = Object.entries(gTasks).sort((a, b) => {
      return b[1].length - a[1].length;
    });

    gTasks = sortedByTasks.reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as GroupTasksType);

    setGroupTasks(gTasks);
  };

  useEffect(() => {
    setGroupTasks({});
    if (!props.query) {
      setLoading(false);
      return;
    }
    setLoading(true);

    const requests: Promise<TaskResponse>[] = [];
    Object.values(props.query).forEach((executions) => {
      const r: Promise<TaskResponse>[] = executions.map((e) => (requestTasks(e.id, props.ztToken)));
      requests.push(...r);
    });

    // 使用 promise.all 请求多个迭代的任务,  并统一处理结果数据,
    // 以便 loading 状态的统一控制
    Promise.all(requests).then((res: TaskResponse[]) => {
      const allTasks: Task[] = [];
      res.forEach(res => {
        allTasks.push(...res.tasks);
      });
      groupTasksByAssigned(allTasks);
    }).finally(() => {
      setLoading(false);
    });
  }, [props.query]);

  return (
    <>
      <ProCard loading={loading} title='任务列表' headerBordered layout='center' style={{ overflowX: 'auto' }}>
        {groupTasks && (
          <>
            <Row wrap={false}>
              {Object.keys(groupTasks).map((assigned) => (
                <Col key={assigned} style={{ minWidth: 300 }}>
                  <Tasks title={assigned} tasks={groupTasks[assigned]} />
                </Col>
              ))}
            </Row>
          </>
        )}
        {(!groupTasks) && <Empty />}
      </ProCard>
    </>
  );
};
