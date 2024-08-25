import {request} from 'umi';

import { ExecutionResponse, Project, TaskResponse } from './data';

// 定义常量
const ZT_API_HOST = 'https://zt.petkit.cn';

export async function requestZtToken(): Promise<{data: string}> {
  return request('/api/zentao/token', { method: 'GET' });
}

export async function requestProjects(): Promise<{ data: Project[] }> {
  return request('/api/zentao/projects', { method: 'GET' });
}

export async function requestExecutions(projectId: string, ztToken: string): Promise<ExecutionResponse> {
  const url = ZT_API_HOST.concat("/api.php/v1/projects/{{projectId}}/executions").replace('{{projectId}}', projectId)
  return request(url, { method: 'GET', headers: {Token: ztToken}});
}

/**
 * 获取执行任务列表
 * @link https://www.zentao.net/book/api/715.html
 */
export async function requestTasks(executionId: string, ztToken: string): Promise<TaskResponse> {
  const url = ZT_API_HOST.concat("/api.php/v1/executions/{{executionId}}/tasks").replace('{{executionId}}', executionId)
  return request(url, { method: 'GET', headers: {Token: ztToken}});
}
