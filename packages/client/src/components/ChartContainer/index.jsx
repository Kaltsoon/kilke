import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { themeProp } from '../../theme';

const Title = styled.div`
  margin-bottom: ${themeProp('spacing.unit')}px;
  display: flex;
  justify-content: space-between;
`;

const AverageWrapper = styled.div`
  margin-left: ${themeProp('spacing.unit')}px;
`;

const Filters = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${themeProp('spacing.unit')}px;
`;

const Actions = styled.div`
  margin-top: ${themeProp('spacing.unit')}px;
`;

const ChartContainer = ({
  children = null,
  title = null,
  average = null,
  filters = null,
  actions = null,
  ...props
}) => {
  return (
    <Card>
      <CardContent>
        <Title>
          <Typography component="h6" variant="h6">
            {title}
          </Typography>
          {average ? <AverageWrapper>{average}</AverageWrapper> : null}
        </Title>
        {filters ? <Filters>{filters}</Filters> : null}
        {children}
        {actions ? <Actions>{actions}</Actions> : null}
      </CardContent>
    </Card>
  );
};

export default ChartContainer;
