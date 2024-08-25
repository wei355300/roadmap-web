import React, { FC, useEffect, useState } from 'react';
import { Execution, ExecutionResponse } from '@/pages/zentao/data';
import { Button, Card, Cascader, CascaderProps, Typography } from 'antd';

const { Text } = Typography;
import { InteractionTwoTone } from '@ant-design/icons';
import { requestExecutions } from '@/pages/zentao/service';


type PropsType = {
  ztToken: string;
  projectId: string;
  onChange: (projectId: string, executions: Execution[]) => void;
};

/* 级联选择框中的选项数据结构 */
type CascadeOptions = {
  value: string;
  label: string;
}

export const Iterations: FC<PropsType> = (props) => {
  // 分页显示 迭代
  // 按状态, 时间等过滤

  // 禅道返回的 迭代（执行）的响应数据对象
  const [executionResponse, setExecutionResponse] = useState<ExecutionResponse>();
  const [cascadeOptions, setCascadeOptions] = useState<CascadeOptions[]>([]);
  const [checkedExecutions, setCheckedExecutions] = useState<Execution[]>([]);

  const onCascadeChange: CascaderProps<CascadeOptions, 'value', true>['onChange'] = (checkedValues) => {

    let values: Execution[] = [];
    if (checkedValues && checkedValues.length > 0) {
      values = checkedValues.map(checkedValue => (executionResponse?.executions.find(e => e.id === checkedValue[0]) as Execution))
    }
    setCheckedExecutions(values);
    props.onChange(props.projectId, values);

    // let executions: CheckedExecution[] = [];
    // if (checkedValues && checkedValues.length > 0) {
    //   executions =checkedValues.map(checkedValue => (cascadeOptions.find(e => e.value === checkedValue[0]) as CascadeOptions));
    // }
    // setCheckedExecutions(checkedOptions);
    // if (checkedOptions) {
    //   const executions : Execution[] = checkedOptions.map((selectedOption: CascadeOptions) => (executionResponse?.executions.find(e => e.id === selectedOption.value) as Execution));
    //   props.onChange(props.projectId, executions);
    // }
  };

  useEffect(() => {
    requestExecutions(props.projectId, props.ztToken).then(res => {
      setExecutionResponse(res);

      const options: CascadeOptions[] = [];
      res.executions.forEach((execution: Execution) => {
        let label = '【' + execution.status + '】'.concat(execution.name).concat('【' + execution.begin + ' ~ ').concat(execution.end + '】');
        const option: CascadeOptions = { value: execution.id, label: label };
        options.push(option);
      });
      setCascadeOptions(options);
    });
  }, [props.projectId]);

  return (<>
    {/*分页查找， 过滤数据 ？？？*/}
    <Card>
      <Cascader
        style={{ width: 240 }}
        options={cascadeOptions}
        multiple={true}
        onChange={onCascadeChange}
        notFoundContent={'Not Content !'}
      >
        <div>
          <Button type='link' size={'small'} icon={<InteractionTwoTone />} /> 选择迭代
          {checkedExecutions.map(e => {
            return (
              <div key={e.id}>
                <Text style={{ width: 400 }} ellipsis>{e.name}</Text>
              </div>
            );
          })}
        </div>
      </Cascader>
    </Card>
  </>);
};
