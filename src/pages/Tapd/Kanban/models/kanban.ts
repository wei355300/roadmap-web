import { Reducer, Subscription } from 'umi';
import { KanbanUtils } from '../util';
import { IKanbanItem } from '../interface';

export interface IKanbanState {
  items: IKanbanItem[][];
}

export interface IKanbanReducers {
  getItems: Reducer<IKanbanState>;
  changeItemLocation: Reducer<IKanbanState>;
}

export interface IKanbanEffects {}

export interface IKanbanSubscriptions {
  setupKanbanIndex: Subscription;
}

export interface IKanbanModel {
  namespace: 'tapdKanban';
  state: IKanbanState;
  reducers: IKanbanReducers;
  effects: IKanbanEffects;
  subscriptions: IKanbanSubscriptions;
}

const KanbanModel: IKanbanModel = {
  namespace: 'tapdKanban',
  state: {
    items: [],
  },
  reducers: {
    getItems(state) {
      const kanbanItems: IKanbanItem[][] = [];
      const random = Math.random() * 10;
      let i = 0;
      for (; i < random; i++) {
        const items: IKanbanItem[]
        = KanbanUtils.generateItems(Math.random() * 20);
        kanbanItems.push(items);
      }

      return {...state, items: kanbanItems};
    },

    changeItemLocation(state, {payload: {oldIndex, newIndex, oldQueueIndex, newQueueIndex}}) {
      if (!state) { return state; }

      const { items } = state;
      const item: IKanbanItem = items[oldQueueIndex][oldIndex];

      if (oldQueueIndex === newQueueIndex) {
        items[oldQueueIndex] = KanbanUtils.reorder(items[oldQueueIndex], oldIndex, newIndex);
      } else {
        items[oldQueueIndex].splice(oldIndex, 1);
        items[newQueueIndex].splice(newIndex, 0, item);
      }

      return {
        ...state,
        items: [...items]
      };
    }
  },
  effects: {},
  subscriptions: {
    setupKanbanIndex({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/tapd/kanban') {
          dispatch({
            type: 'getItems',
          })
        }
      });
    }
  },
};

export default KanbanModel;
