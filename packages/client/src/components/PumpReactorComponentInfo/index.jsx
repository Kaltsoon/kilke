import React from 'react';
import styled from 'styled-components';
import capitalize from 'lodash/capitalize';
import Typography from '@material-ui/core/Typography';

import { themeProp } from '../../theme';

const Container = styled.div``;

const Name = styled(Typography).attrs({ variant: 'body1' })`
  margin-bottom: ${({ theme }) => theme.spacing.unit * 0.5}px;
`;

const SecondaryInfo = styled(Typography)`
  color: ${themeProp('palette.text.secondary')} !important;
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
