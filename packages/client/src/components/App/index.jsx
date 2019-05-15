import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo-hooks';
import { PersistGate } from 'redux-persist/integration/react';

import GlobalStyle from '../GlobalStyle';
import MainPage from '../MainPage';
import ApiContext from '../ApiContext';
import HttpErrorNotifications from '../HttpErrorNotifications';

const App = ({ store, theme, history, apiClient, apolloClient, persistor }) => (
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ApiContext.Provider value={apiClient}>
          <MuiThemeProvider theme={theme}>
            <ThemeProvider theme={theme}>
              <Fragment>
                <HttpErrorNotifications httpClient={apiClient} />
                <GlobalStyle />
                <Router history={history}>
                  <MainPage />
                </Router>
              </Fragment>
            </ThemeProvider>
          </MuiThemeProvider>
        </ApiContext.Provider>
      </PersistGate>
    </Provider>
  </ApolloProvider>
);

export default App;
