import React from 'react';
import styled from 'styled-components';
import { setLightness, darken } from 'polished';

import { themeProp } from '../../theme';

const getColorCss = ({ status, theme }) => {
  let palette = {
    backgroundColor: darken(0.1, '#eeeeee'),
    color: darken(0.4, '#eeeeee'),
  };

  if (status === 'manual') {
    palette = {
      backgroundColor: setLightness(0.9, theme.palette.primary.main),
      color: theme.palette.primary.main,
    };
  }

  if (status === 'automatic') {
    palette = {
      backgroundColor: setLightness(0.9, theme.palette.success.main),
      color: theme.palette.success.main,
    };
  }

  if (status === 'fault') {
    palette = {
      backgroundColor: setLightness(0.9, theme.palette.error.main),
      color: theme.palette.error.main,
    };
  }

  return palette;
};

const TypeContainer = styled.div`
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.6em;
  flex: 0;
  font-family: ${themeProp('typography.fontFamily')};
`;

const Container = styled.div`
  border-radius: 50%;
  width: 1em;
  height: 1em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  ${getColorCss};
`;

const getVariantLabel = variant => {
  if (variant === 'pump') {
    return 'p';
  }
};

const ReactorComponentStatus = ({
  variant,
  status,
  name = null,
  value = null,
  ...props
}) => {
  return (
    <Container status={status} {...props}>
      <TypeContainer>{getVariantLabel(variant)}</TypeContainer>
    </Container>
  );
};

export default ReactorComponentStatus;
