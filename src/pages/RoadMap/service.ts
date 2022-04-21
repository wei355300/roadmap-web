import request from 'umi-request';

export async function requestDomains(): Promise<{ data: string }> {
  return request('/api/git/file/domains.json', { method: 'GET' });
}
