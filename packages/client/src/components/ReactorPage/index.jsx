import React from 'react';
import styled from 'styled-components';

import ApiSensorReactorComponent from '../ApiSensorReactorComponent';
import ApiBinarySensorReactorComponent from '../ApiBinarySensorReactorComponent';
import ApiPumpReactorComponent from '../ApiPumpReactorComponent';
import useSystem from '@/hooks/useSystem';
import ReactorLayout from './ReactorLayout';

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const ReactorPage = () => {
  const { system } = useSystem({ includeReactor: true });

  const pumps = system && system.reactor ? system.reactor.pumps : [];
  const sensors = system && system.reactor ? system.reactor.sensors : [];

  const binarySensors =
    system && system.reactor ? system.reactor.binarySensors : [];

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
        {binarySensors.map(sensor => (
          <ApiBinarySensorReactorComponent
            binarySensor={sensor}
            key={sensor.id}
            componentId={sensor.id}
          />
        ))}
      </ReactorLayout>
    </Container>
  );
};

export default ReactorPage;
