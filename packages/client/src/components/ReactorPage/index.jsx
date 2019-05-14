import React from 'react';
import styled from 'styled-components';

import ApiSensorReactorComponent from '../ApiSensorReactorComponent';
import ApiPumpReactorComponent from '../ApiPumpReactorComponent';
import useSystem from '@/hooks/useSystem';
import ReactorLayout from './ReactorLayout';

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.unit * 0.5}px;
`;

const ReactorPage = () => {
  const { system } = useSystem({ includeReactor: true });

  const pumps = system && system.reactor ? system.reactor.pumps : [];
  const sensors = system && system.reactor ? system.reactor.sensors : [];

  return (
    <Container>
      <ReactorLayout>
        {pumps.map(pump => (
          <ApiPumpReactorComponent
            pump={pump}
            key={pump.id}
            componentId={pump.id}
          />
        ))}
        {sensors.map(sensor => (
          <ApiSensorReactorComponent
            sensor={sensor}
            key={sensor.id}
            componentId={sensor.id}
          />
        ))}
      </ReactorLayout>
    </Container>
  );
};

export default ReactorPage;
