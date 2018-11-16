import { createReducer } from 'redux-create-reducer';
import produce from 'immer';

import { UPDATE_BY_ID, UPDATE_LATEST_BY_TYPE } from './actions';

const initialState = {
  byId: {},
  latestByType: {},
};

export default createReducer(initialState, {
  [UPDATE_BY_ID](
    state,
    {
      payload: { id, update },
    },
  ) {
    return produce(state, draft => {
      draft.byId[id] = draft.byId[id] || {};
      draft.byId[id] = { ...draft.byId[id], ...update };
    });
  },
  [UPDATE_LATEST_BY_TYPE](
    state,
    {
      payload: { type, update },
    },
  ) {
    return produce(state, draft => {
      draft.latestByType[type] = draft.latestByType[type] || {};
      draft.latestByType[type] = { ...draft.latestByType[type], ...update };
    });
  },
});
