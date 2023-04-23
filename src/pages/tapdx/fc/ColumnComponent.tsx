/**
 * 使用 栅格列表(antd) 的形式展示队列信息
 */
import React, { FC, useEffect, useState } from 'react';
import { Result, Card, Tabs } from 'antd';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import type { TraceDataType, Project } from '../data';
import { requestWorkerTraceData } from '../service';
import DroppableComponent from './DroppableComponent';
// import { FrappeGantt, ViewMode } from "frappe-gantt-react";
// import type { Task } from 'frappe-gantt-react/typings/Task';

import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import './gantt.css';

import style from './styles.less';

type GrantTaskType = {
  link?: string;
} & Task;

const ColumnComponent: FC<{query: Project[]}> = (props) => {

  const [loading, setLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<TraceDataType[]>([]);
  const [ganttTasks, setGanttTasks] = useState<GrantTaskType[]>([]);

  const onReOrder = (sInd: number, startIndex: number, endIndex: number) => {
    const list = tasks || [];
    const workerData = list[sInd];
    const workerTraces = Array.from(workerData.traces);
    const [removed] = workerTraces.splice(startIndex, 1);
    workerTraces.splice(endIndex, 0, removed);

    workerData.traces = workerTraces;
    const newList = [...list];
    newList[sInd] = workerData;
    setTasks(newList);
  };

  const onMove = (
    sourceIndex: number,
    destIndex: number,
    sourceStartIndex: number,
    destEndIndex: number,
  ) => {
    const list = tasks || [];
    const sourceWorkerData = list[sourceIndex];
    const destWorkerData = list[destIndex];
    const sourceWorkerTraces = Array.from(sourceWorkerData.traces);
    const destWorkerTraces = Array.from(destWorkerData.traces);
    const [removed] = sourceWorkerTraces.splice(sourceStartIndex, 1);

    destWorkerTraces.splice(destEndIndex, 0, removed);

    sourceWorkerData.traces = sourceWorkerTraces;
    destWorkerData.traces = destWorkerTraces;

    const newList = [...list];
    newList[sourceIndex] = sourceWorkerData;
    newList[destIndex] = destWorkerData;
    setTasks(newList);
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      onReOrder(sInd, source.index, destination.index);
    } else {
      onMove(sInd, dInd, source.index, destination.index);
    }
  };

  /**
   * 按开始时间排序
   * @param data
   */
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

  const requestColumnData = (query: Project[]) => {
    if (!query || query.length === 0) {
      setLoading(false);
      return;
    }
    setLoading(true);
    requestWorkerTraceData(query)
      .then((res) => {
        if (res.data) {
          setTasks(res.data);
          convertToGanttTasks(res.data);
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

  return (
    <>
      {ganttTasks && ganttTasks.length > 0 &&
        <div className={style.ganttBarLabel}>
          <Card style={{ marginTop: 20 }} loading={loading}>
            <Gantt
              tasks={ganttTasks}
              viewMode={ViewMode.Day}
              // onDateChange={onTaskChange}
              // onTaskDelete={onTaskDelete}
              // onProgressChange={onProgressChange}
              // onDoubleClick={onDblClick}
              onClick={(task: GrantTaskType) => window.open(task.link, "_blank")}
            />
            {/*<FrappeGantt*/}
            {/*  tasks={ganttTasks}*/}
            {/*  viewMode={ViewMode.Week}*/}
            {/*  onClick={(task: any) => window.open(task.link, "_blank")}*/}
            {/*/>*/}
          </Card>
        </div>
      }
      <Card style={{ marginTop: 20, fontSize: 20 }} loading={loading}>
        {tasks && tasks.length > 0 ? (
          <div style={{ display: 'flex', overflowX: 'auto' }}>
            <DragDropContext onDragEnd={onDragEnd}>
              {tasks.map((traceData, ind) => (
                <Droppable key={ind} droppableId={`${ind}`}>
                  {(provided) => (
                    <DroppableComponent droppableProvided={provided} traceData={traceData} />
                  )}
                </Droppable>
              ))}
            </DragDropContext>
          </div>
        ) : (
          <Result status="info" title="无数据展示" subTitle="请选择项目!" />
        )}
      </Card>
    </>
  );
};

export default ColumnComponent;
