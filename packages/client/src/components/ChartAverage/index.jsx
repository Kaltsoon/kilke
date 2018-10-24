import React from 'react';
import styled from 'styled-components';
import humanize from 'humanize-duration';
import Icon from '@material-ui/core/Icon';

import { themeProp } from '../../theme';

const Container = styled.div`
`;

const ValuesWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  white-space: nowrap;
`;

const Current = styled.div`
  font-family: ${themeProp('typography.fontFamily')};
  color: ${themeProp('palette.text.primary')};
  font-weight: bold;
  font-size: 1.2em;
`;

const Footer = styled.div`
  margin-top: 0.25em;
  font-size: 0.75em;
  font-family: ${themeProp('typography.fontFamily')};
  color: ${themeProp('palette.text.secondary')};
`;

const Trend = styled.div`
  font-size: 1em;
  margin-left: 0.5em;
  font-family: ${themeProp('typography.fontFamily')};

  ${({ theme, delta }) => ({
    color: delta < 0 ? theme.palette.danger.main : theme.palette.success.main,
  })}
`;

const TrendIcon = styled(Icon)`
  font-size: 1em !important;
`;

const ChartAverage = ({ current, previous, timespan, unit = '', ...props }) => {
  const delta = (current - previous).toFixed(2);

  return (
    <Container {...props}>
      <ValuesWrapper>
        <Current>{current}{unit}</Current>
        <Trend delta={delta}>
          {delta >= 0 ? '+' : ''}{delta}{unit} <TrendIcon>{delta < 0 ? 'trending_down' : 'trending_up'}</TrendIcon>
        </Trend>
      </ValuesWrapper>
      <Footer>
        Past {humanize(timespan)} average
      </Footer>
    </Container>
  );
};

export default ChartAverage;
