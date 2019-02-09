import React from 'react';
import styled from 'styled-components';
import { Route, Redirect, Switch } from 'react-router-dom';

import { themeProp } from '../../theme';
import TabPage from '../TabPage';
import MainNavigation from '../MainNavigation';
import ReactorPage from '../ReactorPage';
import ConfigPage from '../ConfigPage';

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

const MainPage = () => {
  return (
    <Container>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
      <Switch>
        <Route path="/tabs/:tab" component={TabPage} />
        <Route path="/reactor" component={ReactorPage} />
        <Route path="/config" component={ConfigPage} />
        <Redirect to="/config" />
      </Switch>
    </Container>
  );
};

export default MainPage;
