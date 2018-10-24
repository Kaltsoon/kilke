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
  background-color: #eeeeee;
`;

const NavigationContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  padding: 0px ${({ theme }) => theme.spacing.unit * 3}px;
  box-shadow: ${themeProp('shadows[1]')};
  background-color: white;
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
