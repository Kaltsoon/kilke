import { createReducer } from 'redux-create-reducer';
import produce from 'immer';

import { UPDATE_TYPE } from './actions';

const initialState = {
  types: {},
};

export default createReducer(initialState, {
  [UPDATE_TYPE](
    state,
    {
      payload: { type, update },
    },
  ) {
    return produce(state, draft => {
      if (!draft.types[type]) {
        draft.types[type] = {};
      }

      draft.types[type] = {
        ...draft.types[type],
        ...update,
      };
    });
  },
});
