import React from 'react';
import Link from 'redux-first-router-link';
import { connect } from 'react-redux';

import Tabs, { Tab } from '../Tabs';

import { ROUTE_SENSORS } from '../../routes';

const MainNavigation = ({ type }) => {
  return (
    <Tabs>
      <Tab as={Link} to="/sensors" active={type === ROUTE_SENSORS}>Sensors</Tab>
      <Tab>Switches</Tab>
      <Tab>Pumps</Tab>
    </Tabs>
  );
};

export default connect(
  ({ location }) => ({
    type: location.type,
  }),
)(MainNavigation);
