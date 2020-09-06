import React, { Component } from 'react';
import { Droppable, Draggable, DropResult, DraggableLocation } from 'react-beautiful-dnd';
import { connect } from 'umi';
import UserInfo from './UserInfo';
import TaskCard from './TaskCard';
import styles from './index.less';
import { IKanbanItem } from '../interface';

interface TaskQueueProps {
  // modalVisible: boolean;
  // onCancel: () => void;
  // userList: any[];
  itemList: IKanbanItem[];
  index: number;
}

export class TaskQueue extends Component<TaskQueueProps> {

  getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    width: 250,
  });

  getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: 10 * 2,
    margin: `0 0 ${10}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
  });

  render() {
    return (
      <section className={styles['task-queue__container']}>
        <UserInfo />
        <section className={`no-scroll-bar ${styles['task-queue__drag-drop-container']}`}>
          <Droppable droppableId={`droppable-${this.props.index}`}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={this.getListStyle(snapshot.isDraggingOver)}
              >
                {(this.props.itemList || []).map((item, index) => (
                  <Draggable key={item.uuid} draggableId={item.uuid} index={index}>
                    {(provided2, snapshot2) => (
                      <div
                        className={styles['task-card__outter']}
                        ref={provided2.innerRef}
                        {...provided2.draggableProps}
                        {...provided2.dragHandleProps}
                        style={this.getItemStyle(
                          snapshot2.isDragging,
                          provided2.draggableProps.style
                        )}>
                        <TaskCard
                          id={item.id}
                          content={item.content} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </section>
      </section>
    );
  }
}

const mapStateToProps = () => {
  return {
  };
};
// const mapStateToProps = ({items}) => ({
//   items: items,
// });

export default connect(mapStateToProps)(TaskQueue);
