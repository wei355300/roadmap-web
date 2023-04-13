/**
 * 使用 栅格列表(antd) 的形式展示队列信息
 */
import React from 'react';
import { Result, Card } from 'antd';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import type { TraceDataType, Project } from '../data';
import { requestWorkerTraceData } from '../service';
import DroppableComponent from './DroppableComponent';
import { FrappeGantt, ViewMode } from "frappe-gantt-react";
import type { Task } from 'frappe-gantt-react/typings/Task';

interface ColumnPropsType {
  query: Project[];
}

interface ColumnStateType {
  // updateData?: any;
  list?: TraceDataType[];
  ganttTasks?: Task[];
  loading: boolean;
}

class ColumnComponent extends React.Component<ColumnPropsType, ColumnStateType> {

  constructor(props: ColumnPropsType) {
    super(props);
    console.log("ColumnComponent", props);
    this.state = {
      list: [],
      loading: false
    };
  }

  componentDidMount() {
    this.requestColumnData(this.props.query);
  }

  requestColumnData = (query: Project[]) => {
    if (!query || query.length === 0) {
      this.setState({loading: false});
      return;
    }
    this.setState({loading: true});
    requestWorkerTraceData(query)
      .then((res) => {
        if (res.data) {
          this.setState({ list: res.data });
          this.convertToGanttTasks(res.data);
        }
      })
      .catch((error) => {
        console.log('requestWorkerTraceData error', error);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  convertToGanttTasks = (data: TraceDataType[]) => {
    const tasks: any[] = [];
    data.forEach(d => {
      d.traces.map((trace) => {
        tasks.push({
          id: trace.id,
          name: trace.name,
          start: trace.start || '',
          end: trace.end || '',
          progress: 10,
          custom_class: "bar-milestone" // optional
        })
      });
    })
    this.setState({ganttTasks: tasks})
  }

  onReOrder = (sInd: number, startIndex: number, endIndex: number) => {
    const list = this.state.list || [];
    const workerData = list[sInd];
    const workerTraces = Array.from(workerData.traces);
    const [removed] = workerTraces.splice(startIndex, 1);
    workerTraces.splice(endIndex, 0, removed);

    workerData.traces = workerTraces;
    const newList = [...list];
    newList[sInd] = workerData;
    this.setState({ list: newList });
  };

  onMove = (
    sourceIndex: number,
    destIndex: number,
    sourceStartIndex: number,
    destEndIndex: number,
  ) => {
    const list = this.state.list || [];
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
    this.setState({ list: newList });
  };

  onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      this.onReOrder(sInd, source.index, destination.index);
    } else {
      this.onMove(sInd, dInd, source.index, destination.index);
    }
  };

  render() {
    const columnData = this.state.list;
    return (
      <>
        {this.state.ganttTasks && this.state.ganttTasks.length > 0 &&
          <div>
            <Card style={{ marginTop: 20 }} loading={this.state.loading}>
              <FrappeGantt
                tasks={this.state.ganttTasks || []}
                viewMode={ViewMode.Week}
              />
            </Card>
          </div>
        }
        <Card style={{ marginTop: 20 }} loading={this.state.loading}>
          {columnData && columnData.length > 0 ? (
            <div style={{ display: 'flex', overflowX: 'auto' }}>
              <DragDropContext onDragEnd={this.onDragEnd}>
                {columnData.map((traceData, ind) => (
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
  }
}

export default ColumnComponent;
