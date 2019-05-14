import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

import charts from './charts';
import reactorComponents from './reactorComponents';

export default (reducers = {}) =>
  combineReducers({
    ...reducers,
    charts,
    reactorComponents: persistReducer(
      {
        storage,
        key: 'reactorComponents',
        stateReconciler: hardSet,
        version: 1,
      },
      reactorComponents,
    ),
  });
