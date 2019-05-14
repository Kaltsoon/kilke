import React from 'react';
import styled from 'styled-components';
import { Route, Redirect, Switch } from 'react-router-dom';

import { themeProp } from '@/theme';
import TabPage from '../TabPage';
import SystemTabs from '../SystemTabs';
import ReactorPage from '../ReactorPage';
import ConfigPage from '../ConfigPage';
import SystemIdContext from '../SystemIdContext';
import SystemSelectionPage from '../SystemSelectionPage';
import AppBar from '../AppBar';

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

const SystemPage = ({
  match: {
    url,
    params: { systemId },
  },
}) => (
  <SystemIdContext.Provider value={systemId}>
    <NavigationContainer>
      <SystemTabs />
    </NavigationContainer>
    <Switch>
      <Route path={`${url}/tabs/:tab`} component={TabPage} />
      <Route path={`${url}/reactor`} component={ReactorPage} />
      <Route path={`${url}/config`} component={ConfigPage} />
      <Redirect to={`${url}/config`} />
    </Switch>
  </SystemIdContext.Provider>
);

const MainPage = () => {
  return (
    <Container>
      <AppBar />
      <Switch>
        <Route path="/system-select" exatct component={SystemSelectionPage} />
        <Route path={'/:systemId'} component={SystemPage} />
        <Redirect to="/system-select" />
      </Switch>
    </Container>
  );
};

export default MainPage;
