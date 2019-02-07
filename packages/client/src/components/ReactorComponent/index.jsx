import React from 'react';
import styled, { css } from 'styled-components';
import isFunction from 'lodash/isFunction';

import { themeProp } from '../../theme';
import ReactorComponentStatus from '../ReactorComponentStatus';

const Status = styled(ReactorComponentStatus)`
  box-shadow: ${({ theme }) => theme.shadows[1]};

  ${({ clickable }) => {
    return (
      clickable &&
      css`
        cursor: pointer;
      `
    );
  }}
`;

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
`;

const IconContainer = styled.div`
  flex: 0;
  margin: ${({ theme }) => theme.spacing.unit}px 0px;
  font-size: 2.5rem;
  line-height: 0;
  display: flex;
  justify-content: center;
`;

const Label = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  ${themeProp('typography.body1')};
  font-size: 0.8rem;
  color: white;
  border-radius: ${themeProp('shape.borderRadius')}px;
  padding: 4px 6px;
  flex: 0;
  white-space: nowrap;
  transition: background-color 0.25s;

  ${({ clickable }) => {
    return (
      clickable &&
      css`
        cursor: pointer;

        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }
      `
    );
  }}
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ReactorComponent = ({
  label = null,
  status = null,
  name = null,
  value = null,
  onNameClick,
  onValueClick,
  onStatusClick,
  ...props
}) => {
  return (
    <Container {...props}>
      <LabelContainer>
        <Label onClick={onNameClick} clickable={isFunction(onNameClick)}>
          {name}
        </Label>
      </LabelContainer>
      <IconContainer>
        <Status
          status={status}
          onClick={onStatusClick}
          clickable={isFunction(onStatusClick)}
        >
          {label}
        </Status>
      </IconContainer>
      <LabelContainer>
        {value ? (
          <Label onClick={onValueClick} clickable={isFunction(onValueClick)}>
            {value}
          </Label>
        ) : null}
      </LabelContainer>
    </Container>
  );
};

export default ReactorComponent;
