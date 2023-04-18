
export type Role = {
  id: string;
  name: string;
}

export type Iteration = {
  id: string;
  name?: string;
  startDate?: string;
  endDate?: string;
}

export type Project = {
  id: string;
  name: string;
  roles?: Role[]; //按角色查询
  iterations?: Iteration[]; //按迭代查询
  startDate?: string;
  endDate?: string;
}

export interface FilterChangedAction {
  onChanged: (filterProjects: Project[]) => void;
}

export interface WorkerTraceType {
  id: string;
  type: string; //任务类型: story(需求), task(任务), bug(缺陷)
  link: string; //任务链接
  weight: number; //任务权重
  name: string; //任务名字
  start?: string;
  end?: string;
}

export interface TraceDataType {
  name: string;
  user: string;
  role: string;
  id: string;
  traces: WorkerTraceType[]; //任务列表
}
