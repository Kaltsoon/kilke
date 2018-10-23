import { createGlobalStyle } from 'styled-components'

import { themeProp } from '../../theme';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: ${themeProp('typography.fontSize')};
  }

  html, body {
    margin: 0px;
    padding: 0px;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
