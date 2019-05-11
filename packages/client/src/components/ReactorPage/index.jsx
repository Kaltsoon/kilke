import React from 'react';
import styled from 'styled-components';

import ApiSensorReactorComponent from '../ApiSensorReactorComponent';
import ApiPumpReactorComponent from '../ApiPumpReactorComponent';
import useSystem from '../useSystem';

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.unit * 0.5}px;
`;

const ProcessPage = () => {
  const { system } = useSystem({ includeReactor: true });

  const pumps = system && system.reactor ? system.reactor.pumps : [];
  const sensors = system && system.reactor ? system.reactor.sensors : [];

  console.log(system);

  return (
    <Container>
      {pumps.map(pump => (
        <ApiPumpReactorComponent pump={pump} key={pump.id} />
      ))}
      {sensors.map(sensor => (
        <ApiSensorReactorComponent sensor={sensor} key={sensor.id} />
      ))}
    </Container>
  );
};

export default ProcessPage;
