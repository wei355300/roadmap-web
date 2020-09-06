import { Dispatch } from '@@/plugin-dva/connect';
import { RequestOptionsInit } from "umi-request";

// request方法所需参数
export interface IRequestOption {
  url: string;
  option: RequestOptionsInit;
}

// service 通用数据结构
export interface IService {
  api: {[key: string]: IRequestOption};
}


// 接口返回结果内容
export interface IResponse<T> {
  code: number;
  msg: string;
  data: T;
}

export interface IDvaAPI {
  history: History,
  dispatch: Function,
}
