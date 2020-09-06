import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import { ConnectState } from '@/models/connect';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
// import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { LabeledValue } from 'antd/es/select';
import { IDvaAPI } from '@/models/common.interface';
import styles from './Kanban.less';
import { TaskQueue } from './components/TaskQueue';
import { IKanbanItem } from './interface';
// import TaskCard from './components/TaskCard';

export interface KanbanProps extends IDvaAPI {
  queueList: IKanbanItem[][];
}

export class Kanban extends Component<KanbanProps> {
  options: LabeledValue[] = [{
    label: 'Jack',
    value: 'jack',
  }, {
    label: 'Lucy',
    value: 'lucy',
  }, {
    label: 'Tom',
    value: 'tom',
  }];

  // constructor(props: KanbanProps) {
  //   super(props);

  //   console.log(props);
  // }

  onDragEnd = ({source, destination}: DropResult): void => {
    // dropped outside the list
    if (!destination) {
      return ;
    }

    const sourceIndex = source.index;
    const destinationIndex = destination.index;
    const queueSourceIndex = +source.droppableId.split('-')[1];
    const queueDestinationIndex = +destination.droppableId.split('-')[1];

    this.props.dispatch({
      type: 'tapdKanban/changeItemLocation',
      payload: {
        oldQueueIndex: queueSourceIndex, newQueueIndex: queueDestinationIndex,
        oldIndex: sourceIndex, newIndex: destinationIndex
      }
    });
  }

  getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: 10 * 2,
    margin: `0 0 ${10}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: 10,
    width: 250,
  });

  // constructor(props: KanbanProps) {
  //   super(props);
  // }

  // onChange(value: string) {
  //   console.log(`selected ${value}`);
  // }

  render() {
    // <section className={styles.kanban__filter}>
    //   <Select
    //     options={this.options}
    //     showSearch
    //     style={{ width: 200 }}
    //     onChange={this.onChange}
    //     placeholder="请选择一个迭代"
    //   />
    // </section>
    
    return (
      <PageContainer className={styles.kanban__container}>
        <section className={styles.kanban__wrapper}>
          <DragDropContext onDragEnd={this.onDragEnd}>
          {this.props.queueList.map((itemList, index) => (
            <TaskQueue
              ref={`${new Date().getTime()}-${index}`}
              key={JSON.stringify(itemList)}
              itemList={itemList}
              index={index}/>
          ))}
          </DragDropContext>
        </section>
      </PageContainer>
    );
  }
}

const mapPropsToState = (state: ConnectState) => {
  return {
    queueList: state.tapdKanban.items,
  };
};

export default connect(mapPropsToState)(Kanban);
