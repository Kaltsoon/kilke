import React from 'react';
import styled from 'styled-components';

import { themeProp } from '../../theme';

const variantToComponent = {
  default: 'span',
  paragraph: 'p',
};

const TypographyBase = styled.span`
  font-family: ${themeProp('typography.fontFamily')};
  color: ${themeProp('palette.text.base')};
  font-size: 1rem;
  line-height: ${themeProp('typography.lineHeight')};

  ${({ theme, variant }) => {
    return theme.typography[variant] || {};
  }}
`;

const Typography = ({ variant = 'default', as, ...props }) => {
  const component = as || variantToComponent[variant] || 'span';
  return <TypographyBase variant={variant} as={component} {...props} />;
};

export default Typography;
