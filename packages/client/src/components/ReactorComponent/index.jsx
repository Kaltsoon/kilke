import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

const Container = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spacing.unit * 2}px;
`;

const IconContainer = styled.div`
  flex: 0;
  margin-right: ${({ theme }) => theme.spacing.unit * 2}px;
  font-size: 2.5rem;
  line-height: 0;
`;

const InfoContainer = styled.div`
  flex: 1;
`;

const ReactorComponent = ({ icon = null, children = null, ...props }) => {
  return (
    <Card {...props}>
      <CardActionArea>
        <Container>
          <IconContainer>{icon}</IconContainer>
          <InfoContainer>{children}</InfoContainer>
        </Container>
      </CardActionArea>
    </Card>
  );
};

export default ReactorComponent;
