import React from 'react';
import Link from 'redux-first-router-link';
import { connect } from 'react-redux';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { ROUTE_CHARTS_TEMPERATURE, ROUTE_CHARTS_WEIGHT, ROUTE_CHARTS_PH } from '../../routes';

const typeToValue = {
  [ROUTE_CHARTS_TEMPERATURE]: 0,
  [ROUTE_CHARTS_PH]: 1,
  [ROUTE_CHARTS_WEIGHT]: 2,
};

const MainNavigation = ({ type }) => {
  return (
    <Tabs value={typeToValue[type]} indicatorColor="primary" textColor="primary">
      <Tab component={Link} to={{type: ROUTE_CHARTS_TEMPERATURE }} label="Temperature" />
      <Tab component={Link} to={{type: ROUTE_CHARTS_PH }} label="pH" />
      <Tab component={Link} to={{type: ROUTE_CHARTS_WEIGHT }} label="Weight" />
    </Tabs>
  );
};

export default connect(
  ({ location }) => ({
    type: location.type,
  }),
)(MainNavigation);
