import { createStore, applyMiddleware, compose } from 'redux';
import { connectRoutes } from 'redux-first-router';
import axios from 'axios';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import routesMap from '../routes';
import { createApiClient } from '../api';
import createRootReducer from './rootReducer';

const context = {
  httpClient: axios,
  apiClient: createApiClient({ url: process.env.REACT_APP_API_URL }),
};

const {
  reducer: routerReducer,
  middleware: routerMiddleware,
  enhancer: routerEnhancer,
} = connectRoutes(routesMap, { notFoundPath: '/' });

const rootReducer = createRootReducer({
  location: routerReducer,
});

const middleware = applyMiddleware(
  routerMiddleware,
  thunk.withExtraArgument(context),
);

const store = createStore(
  rootReducer,
  composeWithDevTools(
    compose(
      routerEnhancer,
      middleware,
    ),
  ),
);

export default store;
