import React from 'react';
import styled from 'styled-components';

import ApiSensorReactorComponent from '../ApiSensorReactorComponent';
import ApiPumpReactorComponent from '../ApiPumpReactorComponent';

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.unit * 0.5}px;
`;

const ProcessPage = () => {
  return (
    <Container>
      <ApiSensorReactorComponent type="phf" />
      <ApiPumpReactorComponent type="pump_1" />
    </Container>
  );
};

export default ProcessPage;
