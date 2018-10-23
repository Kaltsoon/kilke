import React from 'react';
import styled from 'styled-components';

import { themeProp } from '../../theme';

import RouteSwitch from '../RouteSwitch';
import MainNavigation from '../MainNavigation';
import SensorChartsPage from '../SensorChartsPage';

import { ROUTE_SENSORS } from '../../routes';

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${themeProp('palette.mainBackground')};
`;

const NavigationContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0px ${themeProp('spacing.unit')}px;
  background-color: white;
  border-bottom: 1px solid ${themeProp('palette.separator')};
`;

const tests = [
  { test: ({ type }) => type === ROUTE_SENSORS, component: SensorChartsPage },
];

const MainPage = () => {
  return (
    <Container>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
      <RouteSwitch tests={tests} />
    </Container>
  )
};

export default MainPage;
