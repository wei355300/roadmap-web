import { FC, useEffect, useState } from 'react';
import {
  Row, Col, Descriptions,
} from 'antd';
import type { Project } from '../data';
import { requestProjects } from '../service';

import DateFilterComponent from './DateFilterComponent';
import IterationFilterComponent from './IterationFilterComponent';

const FilterComponent: FC = () => {

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<Project[]>([])

  useEffect(() => {
    requestProjects().then((res) => {
      // const time: number = new Date().getTime(); //通过使用当前的时间戳, 触发ColumnComponent组件的重新渲染
      if(res.data && res.data.length > 0 ) {
        setProjects(res.data);
      }
    });
  }, []);

  return (<>
    <Row>
      <Col span={12}>
        <DateFilterComponent projects={projects} changedAction={setSelectedProjects} />
      </Col>
      <Col span={12}>
        <IterationFilterComponent projects={projects} changedAction={setSelectedProjects} />
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <Descriptions size="small" column={1}>
          {selectedProjects.map((p, i) => {
            return <Descriptions.Item label={p.name} key={i}>
              {p.iterations && p.iterations[0]?.name}
              <br />
            </Descriptions.Item>
          })}
        </Descriptions>
      </Col>
    </Row>
  </>);
}

export default FilterComponent;
