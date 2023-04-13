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
import type { Project } from './data';
// import { Card } from 'antd';
import './styles.less';
import type { FilterChangedAction } from './data';

interface WorkerBoardPropsType {}

interface WorkerBoardStateType {
  query: Project[];
  columnComponentUpdatableKey: number;
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
  changedFilterAction: FilterChangedAction = {
    onChanged: (filterProjects: Project[]) => {
      const time: number = new Date().getTime(); //通过使用当前的时间戳, 触发ColumnComponent组件的重新渲染
      this.setState({ columnComponentUpdatableKey: time });
      this.setState({ query: filterProjects });
    }
  }

  render() {
    return <>
        <FilterComponent key={this.state.columnComponentUpdatableKey} changedAction={this.changedFilterAction} />
        <ColumnComponent key={this.state.columnComponentUpdatableKey + 1} query={this.state.query} />
      </>
  }
}

export default TapdX;
