import { Subscription } from 'umi';

export interface IStoryState {
  items: IStoryItem[][];
}

export interface IStoryReducers {
}

export interface IStoryEffects {}

export interface IStorySubscriptions {
  setup: Subscription;
}

export interface IStoryModel {
  namespace: 'story';
  state: IStoryState;
  reducers: IStoryReducers;
  effects: IStoryEffects;
  subscriptions: IStorySubscriptions;
}

const StoryModel: IStoryModel = {
  namespace: 'story',
  state: {
    items: [],
  },
  reducers: {
  },
  effects: {},
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/kanban') {
        }
      });
    }
  },
};

export default KanbanModel;
