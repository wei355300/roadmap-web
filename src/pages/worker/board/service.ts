import request from 'umi-request';

import {WorkerBoardQueryType, TraceDataType, ProjectQueryType} from './data';

export async function requestWorkerTraceData(p: WorkerBoardQueryType) {
  return request('/api/worker/board/list', {
    params: p,
  });
}

export async function orderWorkerTraceData(data: TraceDataType) {
  return request('/api/worker/board/order', {method: "PUT", params: {trace: data}});
}

export async function requestProjects(): Promise<{ data: ProjectQueryType[] }> {
  return request('/api/worker/board/projects', {method: "GET"});
}
