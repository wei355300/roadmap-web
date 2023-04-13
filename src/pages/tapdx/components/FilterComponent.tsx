import React from 'react';
import {
  Row, Col
} from 'antd';
import type { Project } from '../data';
import { requestProjects } from '../service';

import DateFilterComponent from './DateFilterComponent';
import IterationFilterComponent from './IterationFilterComponent';
import type { FilterChangedAction } from '../data';

interface FilterComponentPropsType {
  //父子组建通信: 修改过滤条件后, 通过该回调将参数传递给父组件
  changedAction: FilterChangedAction;
}

interface FilterComponentStateType {
  projects: Project[];
  componentUpdatableKey?: number;
}

class FilterComponent extends React.Component<FilterComponentPropsType, FilterComponentStateType> {
  constructor(props: FilterComponentPropsType) {
    super(props);
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    requestProjects().then((res) => {
      const time: number = new Date().getTime(); //通过使用当前的时间戳, 触发ColumnComponent组件的重新渲染
      if(res.data && res.data.length > 0 ) {
        this.setState({ componentUpdatableKey: time, projects: res.data });
      }
    });
  }

  render() {
    return <>
        <Row>
          <Col span={12}>
            <DateFilterComponent key={this.state.componentUpdatableKey} projects={this.state.projects} changedAction={this.props.changedAction} />
            {/*{<DateFilterComponent2 projects={this.state.projects} changedAction={this.props.changedAction} />}*/}
            {/*<DateFilterComponent2 projects={this.state.projects} changedAction={this.props.changedAction} />*/}
            {/*{DateFilterComponent2({projects: this.state.projects, changedAction: this.props.changedAction})}*/}
          </Col>
          <Col span={12}>
            <IterationFilterComponent key={this.state.componentUpdatableKey} projects={this.state.projects} changedAction={this.props.changedAction} />
          </Col>
        </Row>
      </>
  }
}

export default FilterComponent;
