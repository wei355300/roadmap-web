import React, {FC} from 'react';
import { Card, Badge } from 'antd';
import { Draggable, DroppableProvided } from 'react-beautiful-dnd';
import { TraceDataType, WorkerTraceType } from '../data';

const DroppableComponent: FC<{droppableProvided: DroppableProvided, traceData: TraceDataType}> = (props) => {

  const getRibbon = (data: WorkerTraceType) => {
    let ribbon = {
      text: '',
      color: 'blue',
    };
    switch (data.type) {
      case 'story':
        ribbon = {
          text: '需求',
          color: 'blue',
        };
        break;
      case 'bug':
        ribbon = {
          text: '缺陷',
          color: 'red',
        };
        break;
      case 'task':
        ribbon = {
          text: ' 任务',
          color: 'grey',
        };
        break;
    }
    return ribbon;
  };

  return (
    <div ref={props.droppableProvided.innerRef} {...props.droppableProvided.droppableProps}>
      <Card title={props.traceData.user + '(' + props.traceData.traces.length + ')'} style={{ width: 280 }}>
        {props.traceData.traces.map((item, index) => (
          <Draggable
            key={item.id + '_' + props.traceData.user}
            draggableId={item.id + '_' + props.traceData.user}
            index={index}
          >
            {(draggableProvided) => (
              <div
                ref={draggableProvided.innerRef}
                {...draggableProvided.draggableProps}
                {...draggableProvided.dragHandleProps}
              >
                <Badge.Ribbon {...getRibbon(item)}>
                  <Card>
                    {
                      <a target="_blank" href={item.link} rel="noreferrer">
                        {item.name}
                      </a>
                    }
                  </Card>
                </Badge.Ribbon>
              </div>
            )}
          </Draggable>
        ))}
        {props.droppableProvided.placeholder}
      </Card>
    </div>
  );
};

export default DroppableComponent;
