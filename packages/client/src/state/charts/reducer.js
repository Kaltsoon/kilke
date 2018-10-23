import { createReducer } from 'redux-create-reducer';
import produce from 'immer';

import { UPDATE_TYPE } from './actions';

const getTypeInitialState = () => ({
  pollInterval: null,
  data: null,
  error: null,
  loading: false,
})

const initialState = {
  types: {
    tco: {
      api: '/v1/charts/analogue-electrodes/tco',
      ...getTypeInitialState(),
    },
    con: {
      api: '/v1/charts/analogue-electrodes/con',
      ...getTypeInitialState(),
    },
  },
};

export default createReducer(initialState, {
  [UPDATE_TYPE](state, { payload: { type, update } }) {
    return produce(state, draft => {
      if (!draft.types[type]) {
        return draft;
      }

      draft.types[type] = {
        ...draft.types[type],
        ...update,
      };
    });
  },
})
