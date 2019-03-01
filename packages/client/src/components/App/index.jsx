import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Router } from 'react-router-dom';
import { StoreContext } from 'redux-react-hook';

import GlobalStyle from '../GlobalStyle';
import MainPage from '../MainPage';
import ApiContext from '../ApiContext';

const App = ({ store, theme, history, apiClient }) => (
  <Provider store={store}>
    <StoreContext.Provider value={store}>
      <ApiContext.Provider value={apiClient}>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <Fragment>
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
);

export default App;
