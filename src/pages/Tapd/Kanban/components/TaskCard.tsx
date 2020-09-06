import React from 'react';
import styles from './index.less';

interface TaskCardProps {
  id: string;
  content: string;
  // modalVisible: boolean;
  // onCancel: () => void;
}

const TaskCard: React.FC<TaskCardProps> = (props) => {
  // const { modalVisible, onCancel } = props;
  const { id, content } = props;

  return (
    <div className={styles['task-card__container']}>
      <p>{id}</p>
      <p>{content}</p>
    </div>
  );
};

export default TaskCard;
