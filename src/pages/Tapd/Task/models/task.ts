import { Subscription, Effect, Reducer } from 'umi';
import { taskService } from '../service';
import { NTaskInterfaces } from '../interface';

export interface ITaskState {
  taskList: NTaskInterfaces.ITask[];
}

export interface ITaskReducers {
  fetchTaskListSuccess: Reducer;
}

export interface ITaskEffects {
  fetchTaskList: Effect;
}

export interface ITaskSubscriptions {
  setup: Subscription;
}

export interface ITaskModel {
  namespace: 'tapdTask';
  state: ITaskState;
  reducers: ITaskReducers;
  effects: ITaskEffects;
  subscriptions: ITaskSubscriptions;
}

const TaskModel: ITaskModel = {
  namespace: 'tapdTask',
  state: {
    taskList: [],
  },
  reducers: {
    fetchTaskListSuccess(state, {type, payload}) {
      return {
        ...state,
        taskList: payload,
      };
    }
  },
  effects: {
    *fetchTaskList(action, {put, call}) {
      const data = yield call(taskService.requestTaskList);
      yield put({
        type: 'fetchTaskListSuccess',
        payload: data,
      });
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/tapd/kanban') {
          dispatch({
            type: 'fetchTaskList',
          })
        }
      });
    }
  },
};

export default TaskModel;
