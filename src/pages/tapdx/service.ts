import {request} from 'umi';

import type { TraceDataType, Project } from './data';

export async function requestWorkerTraceData(params: Project[]): Promise<{data: TraceDataType[]}> {
  return request('/api/tapd/worker/board/traces', {
    data: params,
    method: 'POST',
    requestType: 'json',
  });
}

export async function orderWorkerTraceData(data: TraceDataType) {
  return request('/api/worker/board/order', { method: 'PUT', params: { trace: data } });
}

export async function requestProjects(): Promise<{ data: Project[] }> {
  return request('/api/tapd/worker/board/projects', { method: 'GET' });
}
