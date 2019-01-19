import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as formReducer } from 'redux-form';
import createRootReducer from './rootReducer';

export default ({ httpClient, apiClient, preloadedState, history }) => {
  const context = {
    httpClient,
    apiClient,
    history,
  };

  const rootReducer = createRootReducer({
    form: formReducer,
  });

  const middleware = applyMiddleware(thunk.withExtraArgument(context));

  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(compose(middleware)),
  );
};
