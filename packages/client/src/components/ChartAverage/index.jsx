import React from 'react';
import styled from 'styled-components';
import humanize from 'humanize-duration';
import Typography from '@material-ui/core/Typography';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';

import { themeProp, spacing } from '@/theme';

const Container = styled.div``;

const ValuesWrapper = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

const Current = styled(Typography).attrs(() => ({ variant: 'body1' }))``;

const Footer = styled(Typography)`
  margin-top: 0.25em;
  color: ${themeProp('palette.text.secondary')};
`;

const Trend = styled(Typography).attrs(() => ({ variant: 'body1' }))`
  margin-left: ${spacing(1)};
  display: flex;
  align-items: center;

  ${({ theme, delta }) => ({
    color: delta < 0 ? theme.palette.danger.main : theme.palette.success.main,
  })}
`;

const TrendIcon = styled.div`
  font-size: 1.2rem;
  margin-left: 8px;
`;

const TrendIconUp = TrendIcon.withComponent(TrendingUpIcon);
const TrendIconDown = TrendIcon.withComponent(TrendingDownIcon);

const ChartAverage = ({ current, previous, timespan, unit = '', ...props }) => {
  const delta = current - previous;
  const timespanMinutes = timespan / 60000;
  const deltaFixed = timespan > 0 ? delta / timespanMinutes : 0;

  return (
    <Container {...props}>
      <ValuesWrapper>
        <Current>
          {current.toFixed(2)} {unit}
        </Current>
        <Trend delta={deltaFixed}>
          {deltaFixed >= 0 ? '+' : ''}
          {deltaFixed.toFixed(2)}
          {' 1/min '}
          {delta < 0 ? <TrendIconDown /> : <TrendIconUp />}
        </Trend>
      </ValuesWrapper>
      <Footer>Past {humanize(timespan, { largest: 1 })} average</Footer>
    </Container>
  );
};

export default ChartAverage;
