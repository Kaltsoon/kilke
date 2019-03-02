import React from 'react';
import styled from 'styled-components';
import get from 'lodash/get';

import ApiSensorReactorComponent from '../ApiSensorReactorComponent';
import ApiPumpReactorComponent from '../ApiPumpReactorComponent';
import useConfig from '../useConfig';

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.unit * 0.5}px;
`;

const getPumps = config =>
  Object.entries(get(config, 'reactor.pumps') || {}).map(([key, value]) => ({
    type: key,
    ...(value || {}),
  }));

const getSensors = config =>
  Object.entries(get(config, 'reactor.sensors') || {}).map(([key, value]) => ({
    type: key,
    ...(value || {}),
  }));

const ProcessPage = () => {
  const config = useConfig();
  const pumps = getPumps(config);
  const sensors = getSensors(config);

  return (
    <Container>
      {pumps.map(({ type }) => <ApiPumpReactorComponent type={type} key={type} />)}
      {sensors.map(({ type }) => <ApiSensorReactorComponent type={type} key={type} />)}
    </Container>
  );
};

export default ProcessPage;
