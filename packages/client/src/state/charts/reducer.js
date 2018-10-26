import { createReducer } from 'redux-create-reducer';
import produce from 'immer';

import { UPDATE_TYPE } from './actions';
import { createConfig } from '../../chart';

const getTypeInitialState = () => ({
  pollInterval: 3000,
  data: null,
  options: null,
  averages: null,
  filter: null,
  filterPreset: 'realTime',
  error: null,
  loading: false,
});

const defaultConfig = createConfig()
  .type('areaspline')
  .xAxisType('datetime')
  .xAxisTitle('Time')
  .yAxisTitle('Value');

const initialState = {
  types: {
    tco: {
      api: '/v1/charts/tco',
      unit: '°C',
      config: defaultConfig.yAxisTitle('Temperature').toObject(),
      ...getTypeInitialState(),
    },
    con: {
      api: '/v1/charts/con',
      unit: 'm/S',
      config: defaultConfig.yAxisTitle('Conductivity').toObject(),
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
