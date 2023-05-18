/**
 * 使用 栅格列表(antd) 的形式展示队列信息
 */
import React, { FC, useEffect, useState } from 'react';
import { Result, Card } from 'antd';
import type { TraceDataType } from '../data';

import { Gantt, Task, ViewMode } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import './gantt.css';

import style from './styles.less';

type GrantTaskType = {
  link?: string;
} & Task;

const GanttColumnComponent: FC<{tasks: TraceDataType[]}> = (props) => {

  const [loading, setLoading] = useState<boolean>(true);
  const [ganttTasks, setGanttTasks] = useState<GrantTaskType[]>([]);

  const convertToGanttTasks = (data: TraceDataType[]) => {
    const tasks: any[] = [];
    data.forEach(d => {
      d.traces.forEach((trace) => {
        const t: GrantTaskType = {
          id: d.user + "_" + trace.id,
          name: trace.name,
          start: trace.start? new Date(trace.start) : new Date(),
          end: trace.end? new Date(trace.end) : new Date(),
          type: 'task',
          progress: trace.done ? 100 : 5,
          isDisabled: true,
          styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
          link: trace.link,
        };
        tasks.push(t);
      });
    })
    tasks.sort((a, b) => {
      return a.name>b.name ? 1 : -1;
    });
    setGanttTasks(tasks);
  }

  useEffect(() => {
    convertToGanttTasks(props.tasks);
    setLoading(false);
  }, [props.tasks]);

  return (
    <>
      <Card style={{ marginTop: 20, fontSize: 20 }} loading={loading}>
        {ganttTasks && ganttTasks.length > 0 ? (
          <div className={style.ganttBarLabel}>
            <Card style={{ marginTop: 20 }} loading={loading}>
              <Gantt
                tasks={ganttTasks}
                viewMode={ViewMode.Day}
                onClick={(task: GrantTaskType) => window.open(task.link, "_blank")}
              />
            </Card>
          </div>
        ) : (
          <Result status="info" title="无数据展示" subTitle="请选择项目!" />
        )}
      </Card>
    </>
  );
};

export default GanttColumnComponent;
