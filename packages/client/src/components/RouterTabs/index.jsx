import React, { useMemo } from 'react';
import Tabs from '@material-ui/core/Tabs';
import { withRouter, matchPath } from 'react-router-dom';
import get from 'lodash/get';

const RouterTabs = ({ children, location: { pathname }, ...props }) => {
  const activeIndex = useMemo(
    () => {
      return React.Children.toArray(children)
        .filter(c => React.isValidElement(c))
        .findIndex(c => {
          return !!matchPath(pathname, { path: get(c, 'props.to') });
        });
    },
    [children, pathname],
  );

  return (
    <Tabs value={activeIndex || 0} {...props}>
      {children}
    </Tabs>
  );
};

export default withRouter(RouterTabs);
