import React, {FC} from 'react';
import { Card, Badge, Space } from 'antd';
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
        <Space direction="vertical" size={3}>
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
                    <Card hoverable={true} bodyStyle={item.done ? {backgroundColor: "#f5f5f5"} : {}}>
                      {
                        <a target="_blank" href={item.link} style={item.done ? {color: "#c2b8b8"} : {}} rel="noreferrer">
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
        </Space>

      </Card>
    </div>
  );
};

export default DroppableComponent;
