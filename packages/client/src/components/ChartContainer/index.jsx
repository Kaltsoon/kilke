import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { spacing } from '@/theme';

const Title = styled.div`
  margin-bottom: ${spacing(1)};
  display: flex;
  justify-content: space-between;
`;

const AverageWrapper = styled.div`
  margin-left: ${spacing(1)};
`;

const Filters = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: ${spacing(2)} 0px;
`;

const Actions = styled.div`
  margin-top: ${spacing(1)};
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
    <Card {...props}>
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
