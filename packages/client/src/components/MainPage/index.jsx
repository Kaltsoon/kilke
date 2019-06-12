import React from 'react';
import styled from 'styled-components';
import { Route, Redirect, Switch } from 'react-router-dom';

import { themeProp, spacing } from '@/theme';
import TabPage from '../TabPage';
import SystemTabs from '../SystemTabs';
import ReactorPage from '../ReactorPage';
import ConfigPage from '../ConfigPage';
import SystemIdContext from '../SystemIdContext';
import SystemSelectionPage from '../SystemSelectionPage';
import AppBar from '../AppBar';
import MeasurementsPage from '../MeasurementsPage';

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const NavigationContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  padding: 0px ${spacing(3)};
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
      <Route path={`${url}/measurements`} component={MeasurementsPage} />
      <Redirect to={`${url}/config`} />
    </Switch>
  </SystemIdContext.Provider>
);

const MainPage = () => {
  return (
    <Container>
      <AppBar />
      <Content>
        <Switch>
          <Route
            path="/system-selection"
            exatct
            component={SystemSelectionPage}
          />
          <Route path={'/:systemId'} component={SystemPage} />
          <Redirect to="/system-selection" />
        </Switch>
      </Content>
    </Container>
  );
};

export default MainPage;
