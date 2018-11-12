import React from 'react';
import styled from 'styled-components';

import ReactorGrid, { ReactorGridItem } from '../ReactorGrid';
import ApiPumpReactorComponent from '../ApiPumpReactorComponent';

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.unit * 0.5}px;
`;

const ProcessPage = () => {
  return (
    <Container>
      <ReactorGrid>
        <ReactorGridItem x={0} y={0}>
          <ApiPumpReactorComponent id="pump1" />
        </ReactorGridItem>
        <ReactorGridItem x={1} y={0}>
          <ApiPumpReactorComponent id="pump1" />
        </ReactorGridItem>
        <ReactorGridItem x={1} y={1}>
          <ApiPumpReactorComponent id="pump1" />
        </ReactorGridItem>
      </ReactorGrid>
    </Container>
  );
};

export default ProcessPage;
