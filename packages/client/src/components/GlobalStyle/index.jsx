import { normalize } from 'polished';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ${normalize()};

  a {
    text-decoration: none;
    color: inherit;
  }

  ${({ theme }) => ({
    // From https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/CssBaseline/CssBaseline.js
    html: {
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      boxSizing: 'border-box',
    },
    '*, *::before, *::after': {
      boxSizing: 'inherit',
    },
    'strong, b': {
      fontWeight: 'bolder',
    },
    body: {
      margin: 0,
      color: theme.palette.text.primary,
      ...theme.typography.body1,
      backgroundColor: theme.palette.background.default,
      '@media print': {
        backgroundColor: theme.palette.common.white,
      },
      '&::backdrop': {
        backgroundColor: theme.palette.background.default,
      },
    },
  })}
`;

export default GlobalStyle;
