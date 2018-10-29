import { combineReducers } from 'redux';

import charts from './charts'
import config from './config';
import calibrations from './calibrations';

export default (reducers = {}) =>
  combineReducers({
    ...reducers,
    charts,
    config,
    calibrations,
  });
