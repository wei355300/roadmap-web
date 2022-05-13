/**
 * 使用 栅格列表(antd) 的形式展示队列信息
 */
import React from 'react';
import { Result } from 'antd';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { TraceDataType, ProjectQueryType } from '../data';
import { requestWorkerTraceData } from '../service';
import DroppableComponent from './DroppableComponent';

interface ColumnPropsType {
  query: ProjectQueryType[];
}

interface ColumnStateType {
  // updateData?: any;
  list?: TraceDataType[];
  loading?: boolean;
}

class ColumnComponent extends React.Component<ColumnPropsType, ColumnStateType> {
  constructor(props: ColumnPropsType) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.requestColumnData(this.props.query);
  }

  requestColumnData = (query: ProjectQueryType[]) => {
    if (!query || query.length === 0) {
      return;
    }
    requestWorkerTraceData(query)
      .then((res) => {
        if (res.data) {
          this.setState({ list: res.data });
        }
      })
      .catch((error) => {
        console.log('requestWorkerTraceData error', error);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  onReOrder = (sInd: number, startIndex: number, endIndex: number) => {
    //action(payload) 格式:
    // payload: {
    //     index: sInd,
    //     startIndex: source.index,
    //     endIndex: destination.index
    // }

    const list = this.state.list || [];
    const workerData = list[sInd];
    const workerTraces = Array.from(workerData.traces);
    const [removed] = workerTraces.splice(startIndex, 1);
    workerTraces.splice(endIndex, 0, removed);

    // updateTraceWeightForOrder(removed, workerTraces[endIndex-1], workerTraces[endIndex+1]);

    workerData.traces = workerTraces;
    const newList = [...list];
    newList[sInd] = workerData;
    this.setState({ list: newList });
    // const newState = {
    //   ...state,
    //   list: newList,
    //   updateData: {type: "reorder", payload: action.payload, data: removed}
    // };
    // return newState;
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

    // updateTraceWeightForMove(destWorkerData, removed, destWorkerTraces[destEndIndex-1], destWorkerTraces[destEndIndex+1]);

    sourceWorkerData.traces = sourceWorkerTraces;
    destWorkerData.traces = destWorkerTraces;

    const newList = [...list];
    newList[sourceIndex] = sourceWorkerData;
    newList[destIndex] = destWorkerData;
    this.setState({ list: newList });
    // const newState = {
    //   ...state,
    //   list: newList,
    //   updateData: {type: "move", payload: action.payload, data: removed}
    // };
    // return newState;
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
      </>
    );
  }
}

export default ColumnComponent;
