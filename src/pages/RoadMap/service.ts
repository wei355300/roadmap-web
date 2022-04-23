import request from 'umi-request';

export async function requestContent(fileName: string): Promise<{ data: string }> {
  // const encodeFileName = Buffer.from(fileName, 'utf-8').toString('base64')
  // encodeURI(fileName);
  return request('/api/git/file/?file='+encodeURI(fileName), { method: 'GET' });
}

export async function requestContentWithBranch(fileName: string): Promise<{ data: string }> {
  // const encodeFileName = Buffer.from(fileName, 'utf-8').toString('base64')
  // encodeURI(fileName);
  return request('/api/git/file/branch?file='+encodeURI(fileName)+"&branch=developer", { method: 'GET' });
}
