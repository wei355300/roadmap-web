import request from 'umi-request';

export async function requestDomains(fileName: string): Promise<{ data: string }> {
  const encodeFileName = Buffer.from(fileName, 'utf-8').toString('base64')
  return request('/api/git/file/'+encodeFileName, { method: 'GET' });
}
