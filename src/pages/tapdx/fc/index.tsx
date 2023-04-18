/**
 * 通过选择 tapd 的项目, 以项目中的迭代,
 * 按 tapd 中的用户, 展示任务队列
 *
 * 可以选择多项目, 多迭代
 * 通过多项目, 多迭代中负责人的属性进行任务归集展示
 */

import { FC, useEffect, useState } from 'react';
import ColumnComponent from './ColumnComponent';
import FilterComponent from './FilterComponent';
import './styles.less';
import { Project } from '@/pages/tapdx/data';

const TapdX: FC = () => {

  const [query, setQuery] = useState<Project[]>([]);

  useEffect(() => {}, []);

  return (
    <>
      <FilterComponent doFilter={(query) => {setQuery(query)}} />
      <ColumnComponent query={query} />
    </>
  );
}
export default TapdX;
