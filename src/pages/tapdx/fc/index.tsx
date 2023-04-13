/**
 * 通过选择 tapd 的项目, 以项目中的迭代,
 * 按 tapd 中的用户, 展示任务队列
 *
 * 可以选择多项目, 多迭代
 * 通过多项目, 多迭代中负责人的属性进行任务归集展示
 */

import { FC } from 'react';
// import ColumnComponent from './components/ColumnComponent';
import FilterComponent from './FilterComponent';
// import type { Project } from '../data';
// import { Card } from 'antd';
import './styles.less';
// import type { FilterChangedAction } from './data';

// interface WorkerBoardPropsType {}

// interface WorkerBoardStateType {
//   query: Project[];
//   columnComponentUpdatableKey: number;
// }

const TapdX2: FC = () => {

  // const [query, setQuery] = useState({});

  return (
    <>
      <FilterComponent />
      {/*<ColumnComponent query={query} />*/}
    </>
  );
}
export default TapdX2;
