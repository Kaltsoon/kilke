import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import { themeProp } from '../../theme';
import TabPage from '../TabPage';
import MainNavigation from '../MainNavigation';
import ReactorPage from '../ReactorPage';

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
      <Route path="/tabs/:tab" component={TabPage} />
      <Route path="/reactor" component={ReactorPage} />
    </Container>
  );
};

export default MainPage;
