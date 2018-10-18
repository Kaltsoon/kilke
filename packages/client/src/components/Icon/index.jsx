import React from 'react';
import styled from 'styled-components';

const IconBase = styled.i`
  font-size: 1.5rem;
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: 'liga';
`;

const Icon = ({ children, ...props }) => (
  <IconBase {...props}>{children}</IconBase>
);

export default Icon;
