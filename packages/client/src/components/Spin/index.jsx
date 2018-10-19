import React from 'react';
import styled, { keyframes } from 'styled-components';

import { themeProp, px } from '../../theme';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(359.9deg);
  }
`;

const getSizeStyles = ({ size }) => {
  let multiplier = 1;

  if (size === 'medium') {
    multiplier = 2;
  } else if (size === 'large') {
    multiplier = 3;
  }

  return {
    borderWidth: px(Math.ceil(multiplier * 1.5)),
    width: px(multiplier * 16),
    height: px(multiplier * 16),
  };
};

const SpinBase = styled.div`
  border-color: rgba(0, 0, 0, .15);
  border-top-color: ${themeProp('palette.primary.base')};
  border-left-color: ${themeProp('palette.primary.base')};
  border-style: solid;
  border-radius: 50%;
  animation-name: ${spin};
  animation-duration: 0.75s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  ${getSizeStyles}
`;

const Spin = ({ size = 'medium', ...props }) => (
  <SpinBase size={size} {...props} />
);

export default Spin;
