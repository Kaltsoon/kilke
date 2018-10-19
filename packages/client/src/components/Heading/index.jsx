import React from 'react';
import styled from 'styled-components';

import { themeProp } from '../../theme';
import Typography from '../Typography';

const sizeToComponent = {
  '1': 'h1',
  '2': 'h2',
  '3': 'h3',
  '4': 'h4',
};

const getFontSize = ({ theme, size }) => {
  const fontSize = theme.typography.headingFontSizes[size] || 1;

  return `${fontSize}rem`;
};

const HeadingBase = styled.h1`
  font-family: ${themeProp('typography.fontFamily')};
  ${themeProp('typography.heading')};
  font-size: ${getFontSize};
`;

const Heading = ({ size = 1, as, ...props }) => {
  const component = as || sizeToComponent[size.toString()] || 'h1';
  return <HeadingBase size={size} as={component} {...props} />;
};

export default Heading;
