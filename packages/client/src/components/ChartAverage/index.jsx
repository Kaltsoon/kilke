import React from 'react';
import styled from 'styled-components';
import humanize from 'humanize-duration';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

import { themeProp } from '../../theme';

const Container = styled.div``;

const ValuesWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  white-space: nowrap;
`;

const Current = styled(Typography).attrs({ variant: 'body1' })``;

const Footer = styled(Typography)`
  margin-top: 0.25em;
  color: ${themeProp('palette.text.secondary')} !important;
`;

const Trend = styled(Typography).attrs({ variant: 'body1' })`
  margin-left: ${themeProp('spacing.unit')}px !important;

  ${({ theme, delta }) => ({
    color: `${
      delta < 0 ? theme.palette.danger.main : theme.palette.success.main
    } !important`,
  })}
`;

const TrendIcon = styled(Icon)`
  font-size: 1em !important;
`;

const ChartAverage = ({ current, previous, timespan, unit = '', ...props }) => {
  const delta = current - previous;

  return (
    <Container {...props}>
      <ValuesWrapper>
        <Current>
          {current.toFixed(2)} {unit}
        </Current>
        <Trend delta={delta}>
          {delta >= 0 ? '+' : ''}
          {delta.toFixed(2)}{' '}
          <TrendIcon>{delta < 0 ? 'trending_down' : 'trending_up'}</TrendIcon>
        </Trend>
      </ValuesWrapper>
      <Footer>Past {humanize(timespan)} average</Footer>
    </Container>
  );
};

export default ChartAverage;
