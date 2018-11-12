import { redirect } from 'redux-first-router';

import * as types from './types';

export default {
  [types.ROUTE_INDEX]: {
    path: '/',
    thunk: dispatch =>
      dispatch(redirect({ type: types.ROUTE_CHARTS_TEMPERATURE })),
  },
  [types.ROUTE_CHARTS_TEMPERATURE]: '/temperature',
  [types.ROUTE_CHARTS_PH]: '/ph',
  [types.ROUTE_CHARTS_WEIGHT]: '/weight',
  [types.ROUTE_PROCESS]: '/process',
};
