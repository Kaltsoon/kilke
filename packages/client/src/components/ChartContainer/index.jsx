import React from 'react';
import styled from 'styled-components';

import { themeProp } from '../../theme';
import Heading from '../Heading';

const TitleWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.unit * 0.5}px ${themeProp('spacing.unit')}px;
  border-bottom: 1px solid ${themeProp('palette.separator')};
`;

const ChartWrapper = styled.div`
  padding: ${themeProp('spacing.unit')}px;
`;

const Container = styled.div`
   border: 1px solid ${themeProp('palette.separator')};
   border-radius: ${themeProp('borderRadius.base')};
   background-color: white;
`;

const Title = styled(Heading).attrs({ size: 4 })`
  margin-bottom: 0px;
`;

const ChartContainer = ({ children = null, title, ...props }) => {
  return (
    <Container>
      <TitleWrapper>
        <Title>{title}</Title>
      </TitleWrapper>
      <ChartWrapper>
        {children}
      </ChartWrapper>
    </Container>
  )
};

export default ChartContainer;
