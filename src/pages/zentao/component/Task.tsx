import React, { FC, useEffect } from 'react';
import { Task } from '@/pages/zentao/data';
import ProCard from '@ant-design/pro-card';

type TaskPropType = {
  title: string;
  tasks: Task[];
}

export const Tasks: FC<TaskPropType> = (props) => {

  useEffect(() => {
    // console.log('Tasks', props.tasks);
  }, [props.tasks]);

  return (<>
    <ProCard title={props.title + '('+props.tasks.length+')'} headerBordered layout='center' gutter={[0, 16]} style={{ maxWidth: 400 }} direction="column">
      {props.tasks &&
        props.tasks.map((task) => (
          <ProCard key={'' + task.id + task.assignedTo?.realname} type='inner' bordered style={{ maxWidth: 300 }} hoverable>
            <a target="_blank" href={'https://zt.petkit.cn/task-view-'+task.id+'.html'} rel="noreferrer">
              {task.name}
            </a>
          </ProCard>
        ))}
    </ProCard>
  </>);
};
