import React from 'react';
import styled from 'styled-components';
import { setLightness } from 'polished';

import { themeProp } from '@/theme';

const getColorCss = ({ color, theme }) => {
  let palette = {
    backgroundColor: '#d4d4d4',
    color: '#878787',
  };

  if (color === 'primary') {
    palette = {
      backgroundColor: setLightness(0.9, theme.palette.primary.main),
      color: theme.palette.primary.main,
    };
  }

  if (color === 'success') {
    palette = {
      backgroundColor: setLightness(0.9, theme.palette.success.main),
      color: theme.palette.success.main,
    };
  }

  if (color === 'error') {
    palette = {
      backgroundColor: setLightness(0.9, theme.palette.error.main),
      color: theme.palette.error.main,
    };
  }

  return palette;
};

const TypeContainer = styled.div`
  font-weight: bold;
  font-size: 0.5em;
  flex: 0;
  font-family: ${themeProp('typography.fontFamily')};
`;

const Container = styled.div`
  border-radius: 50%;
  width: 1.2em;
  height: 1.2em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  ${getColorCss};
`;

const ReactorComponentStatus = ({
  color,
  name = null,
  value = null,
  children = null,
  ...props
}) => {
  return (
    <Container color={color} {...props}>
      <TypeContainer>{children}</TypeContainer>
    </Container>
  );
};

export default ReactorComponentStatus;
