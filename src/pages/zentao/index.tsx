import { FC, useEffect, useState } from 'react';
import { Filter } from './component/Filter';
// import './fc/styles.less';
import { requestZtToken } from '@/pages/zentao/service';
import { Panel } from '@/pages/zentao/component/Panel';
import { FilterItems } from '@/pages/zentao/data';

const Zentao: FC = () => {

  const [ztToken, setZtToken] = useState<string>('');

  const [query, setQuery] = useState<FilterItems>();

  useEffect(() => {
    requestZtToken().then((res) => {
      console.log('ztToken', res.data);
      setZtToken(res.data)
    })
  }, []);

  return (
    <>
      <Filter ztToken={ztToken} setFilter={(items) => {setQuery(items)}} />
      <Panel ztToken={ztToken} query={query} />
    </>
  );
}
export default Zentao;
