import React from 'react';
import { ThemeProvider as ScThemeProvider } from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';

import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
} from '@material-ui/core/styles';

const ThemeProvider = ({ theme, children }) => (
  <StylesProvider injectFirst>
    <ScThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>
        <>
          <CssBaseline />
          {children}
        </>
      </MuiThemeProvider>
    </ScThemeProvider>
  </StylesProvider>
);

export default ThemeProvider;
