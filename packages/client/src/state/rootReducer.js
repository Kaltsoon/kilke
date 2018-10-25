import { combineReducers } from 'redux';

import charts from './charts'
import config from './config';

export default (reducers = {}) =>
  combineReducers({
    ...reducers,
    charts,
    config,
  });
