import React from 'react';
import styles from './index.less';

interface UserInfoProps {
  // modalVisible: boolean;
  // onCancel: () => void;
}

const UserInfo: React.FC<UserInfoProps> = () => {
  // const { modalVisible, onCancel } = props;

  return (
    <div className={styles['user-info__container']}>
      <span>邱梦源</span>
    </div>
  );
};

export default UserInfo;
