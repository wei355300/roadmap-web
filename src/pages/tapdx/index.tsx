/**
 * 通过选择 tapd 的项目, 以项目中的迭代,
 * 按 tapd 中的用户, 展示任务队列
 *
 * 可以选择多项目, 多迭代
 * 通过多项目, 多迭代中负责人的属性进行任务归集展示
 */

import React from 'react';
import ColumnComponent from './components/ColumnComponent';
import FilterComponent from './components/FilterComponent';
import type { ProjectQueryType } from './data';
import { Card } from 'antd';
import './styles.less';

interface WorkerBoardPropsType {}

interface WorkerBoardStateType {
  query: ProjectQueryType[];
  columnComponentUpdatableKey?: number;
}

class TapdX extends React.Component<WorkerBoardPropsType, WorkerBoardStateType> {
  constructor(props: WorkerBoardPropsType) {
    super(props);
    this.state = { query: [], columnComponentUpdatableKey: 0 };
  }

  componentDidMount() {}

  /**
   * 过滤条件更新后的操作:
   * 重置ColumnComponent组件的key, 触发组件的更新
   * (重新渲染ColumnComponent的生成, 而不是进行组件的比较后更新, 理论上性能跟好)
   * @param filterProjects
   */
  changeFilterOptions = (filterProjects: ProjectQueryType[]) => {
    const time = new Date().getTime(); //通过使用当前的时间戳, 触发ColumnComponent组件的重新渲染
    this.setState({ columnComponentUpdatableKey: time });
    this.setState({ query: filterProjects });
  };

  render() {
    return (
      <>
        <div>
          <FilterComponent onQuery={this.changeFilterOptions} />
        </div>
        <Card style={{ marginTop: 20 }}>
          <ColumnComponent key={this.state.columnComponentUpdatableKey} query={this.state.query} />
        </Card>
      </>
    );
  }
}

export default TapdX;
