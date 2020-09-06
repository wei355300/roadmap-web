import request from '@/utils/request';
import { IService, IResponse, IRequestOption } from '@/models/common.interface';
import { RequestMethod } from '@/models/common.enum';
import { NTaskInterfaces } from './interface';

export interface TaskService extends IService {
  requestTaskList: Promise<IResponse<NTaskInterfaces.ITask[]>>;
}

export const taskService: TaskService = {

  api: {
    taskList: {
      url: '/api/tapd/task/list',
      option: {
        method: RequestMethod.Get,
      }
    },
  },

  async requestTaskList(id: string = '1122259671001000629'): Promise<IResponse<NTaskInterfaces.ITask[]>> {
    const config: IRequestOption = taskService.api.taskList;
    config.option.params = {id};
    return request(config.url, config.option);
  },

};


