import React from 'react';
import styled from 'styled-components';
import capitalize from 'lodash/capitalize';

import { themeProp } from '../../theme';

const Container = styled.div``;

const Name = styled.div`
  font-family: ${themeProp('typography.fontFamily')};
  color: ${themeProp('palette.text.primary')};
  line-height: 1.2;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.unit * 0.5}px;
`;

const SecondaryInfo = styled.div`
  font-family: ${themeProp('typography.fontFamily')};
  color: ${themeProp('palette.text.secondary')};
  font-size: 0.9rem;
`;

const PumpReactorComponentInfo = ({ name, status, rpm }) => {
  return (
    <Container>
      <Name>{name}</Name>
      <SecondaryInfo>
        {capitalize(status || '-')} · {rpm !== null ? rpm.toFixed(2) : '-'} RPM
      </SecondaryInfo>
    </Container>
  );
};

export default PumpReactorComponentInfo;
