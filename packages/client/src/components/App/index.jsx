import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core/styles';

import GlobalStyle from '../GlobalStyle';
import MainPage from '../MainPage';

const App = ({ store, theme }) => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Fragment>
          <GlobalStyle />
          <MainPage />
        </Fragment>
      </ThemeProvider>
    </MuiThemeProvider>
  </Provider>
);

export default App;
