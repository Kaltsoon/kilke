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
      config: defaultConfig.yAxisTitle('Temperature').toObject(),
      ...getTypeInitialState(),
    },
    cond: {
      api: '/v1/charts/cond',
      config: defaultConfig.yAxisTitle('Conductivity').toObject(),
      ...getTypeInitialState(),
    },
    tamb: {
      api: '/v1/charts/tamb',
      config: defaultConfig.yAxisTitle('Temperature').toObject(),
      ...getTypeInitialState(),
    },
    phd: {
      api: '/v1/charts/phd',
      config: defaultConfig.yAxisTitle('pH').toObject(),
      ...getTypeInitialState(),
    },
    phf: {
      api: '/v1/charts/phf',
      config: defaultConfig.yAxisTitle('pH').toObject(),
      ...getTypeInitialState(),
    },
    wd: {
      api: '/v1/charts/wd',
      config: defaultConfig.yAxisTitle('Weight').toObject(),
      ...getTypeInitialState(),
    },
    wf: {
      api: '/v1/charts/wf',
      config: defaultConfig.yAxisTitle('Weight').toObject(),
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
