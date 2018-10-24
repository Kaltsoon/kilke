import React from 'react';
import Link from 'redux-first-router-link';
import { connect } from 'react-redux';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { ROUTE_SENSORS } from '../../routes';

const typeToValue = {
  [ROUTE_SENSORS]: 0,
};

const MainNavigation = ({ type }) => {
  return (
    <Tabs value={typeToValue[type]} indicatorColor="primary" textColor="primary">
      <Tab component={Link} to={{type: ROUTE_SENSORS }} label="Sensors" />
      <Tab label="Switches" />
      <Tab label="Pumps" />
    </Tabs>
  );
};

export default connect(
  ({ location }) => ({
    type: location.type,
  }),
)(MainNavigation);
