import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Router } from 'react-router-dom';
import { StoreContext } from 'redux-react-hook';
import { ApolloProvider } from 'react-apollo-hooks';

import GlobalStyle from '../GlobalStyle';
import MainPage from '../MainPage';
import ApiContext from '../ApiContext';
import HttpErrorNotifications from '../HttpErrorNotifications';

const App = ({ store, theme, history, apiClient, apolloClient }) => (
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <StoreContext.Provider value={store}>
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
      </StoreContext.Provider>
    </Provider>
  </ApolloProvider>
);

export default App;
