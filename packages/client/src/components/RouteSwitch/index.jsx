import React from 'react';
import { connect } from 'react-redux';

const RouteSwitch = ({ tests, location }) => {
  const match = tests.find(({ test, component }) => test(location));

  if (!match) {
    return null;
  }

  const { component: Component } = match;

  return (
    <Component location={{ type: location.type, payload: location.payload }} />
  );
};

export default connect(state => ({
  location: state.location,
}))(RouteSwitch);
