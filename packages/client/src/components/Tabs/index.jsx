import React from 'react';
import styled from 'styled-components';
import is from 'styled-is';

import { themeProp } from '../../theme';

const TabsContainer = styled.div`
  display: flex;
`;

const TabContainer = styled.div`
  margin-right: ${({ theme }) => theme.spacing.unit}px;
  padding: ${({ theme }) => theme.spacing.unit}px 0px;
  flex: 0;
  white-space: nowrap;
  font-family: ${themeProp('typography.fontFamily')};
  font-size: 1rem;
  color: ${themeProp('palette.text.base')};
  cursor: pointer;
  transition: color 0.25s;
  position: relative;

  &:hover {
    color: ${themeProp('palette.primary.base')};
  }

  ${is('active')`
    color: ${themeProp('palette.primary.base')};
  `}
`;

const TabLine = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 0px;
  transition: height 0.25s;
  background-color: ${themeProp('palette.primary.base')};

  ${is('active')`
    height: 2px;
  `}
`;

const Tabs = ({ children, ...props }) => {
  return (
    <TabsContainer {...props}>
      {children}
    </TabsContainer>
  );
};

export const Tab = ({ children, active = false, ...props }) => {
  return (
    <TabContainer active={active} {...props}>
      {children}
      <TabLine active={active} />
    </TabContainer>
  )
};

export default Tabs;
