
export type FilterItems = {
  [projectId: string]: Execution[]
};

export type GroupTasksType = {
  [assigned: string]: Task[];
}

export type Project = {
  id: string;
  name: string;
}

export type ExecutionResponse = {
  page: number;
  total: number;
  limit: number;
  executions: Execution[]
}

export type Execution = {
  project: string;
  id: string;
  name: string;
  code: string,
  type: string,
  parent: string,
  begin: string,
  end: string,
  status: string,
  openedDate: string,
  progress: string
}

export type TaskResponse = {
  page: number;
  total: number;
  limit: number;
  tasks: Task[]
}

export type Task = {
  assignedTo: {
    id: number,
    account: string,
    avatar: string,
    realname: string
  },
  id: number,
  project: number,
  parent: number,
  execution: number,
  module: number,
  design: number,
  story: number,
  storyVersion: number,
  designVersion: number,
  fromBug: number,
  name: string,
  type: string,
  pri: number,
  estimate: number,
  consumed: number,
  left: number,
  deadline: null,
  status: string,
  subStatus: string,
  color: string,
  mailto: string[],
  desc: string,
  version: number,
}
