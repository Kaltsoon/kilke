import { createReducer } from 'redux-create-reducer';
import produce from 'immer';

import { UPDATE_BY_ID } from './actions';

const initialState = {
  byId: {},
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
});
