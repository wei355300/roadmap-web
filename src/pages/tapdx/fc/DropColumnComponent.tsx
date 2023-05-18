/**
 * 使用 栅格列表(antd) 的形式展示队列信息
 */
import React, { FC, useEffect, useState } from 'react';
import { Result, Card } from 'antd';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import type { TraceDataType } from '../data';
import DroppableComponent from './DroppableComponent';

const DropColumnComponent: FC<{ tasks: TraceDataType[] }> = (props) => {

  const [loading, setLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<TraceDataType[]>([]);

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

  const convertToDropTasks = (data: TraceDataType[]) => {
    setTasks(data);
  }

  useEffect(() => {
    convertToDropTasks(props.tasks);
    setLoading(false);
  }, [props.tasks]);

  return (
    <>
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
          <Result status='info' title='无数据展示' subTitle='请选择项目!' />
        )}
      </Card>
    </>
  );
};

export default DropColumnComponent;
