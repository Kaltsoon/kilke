import React from 'react';
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { Field } from 'redux-form';

const ItemWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.unit * 2}px;
  display: flex;
`;

const Item = styled.div`
  flex: 1;
  width: 50%;
  box-sizing: border-box;

  &:first-child {
    padding-right: ${({ theme }) => theme.spacing.unit}px;
  }
  &:last-child {
    padding-left: ${({ theme }) => theme.spacing.unit}px;
  }
`;

const renderInputField = props => {
  const { input, meta, ...rest } = props;

  return <Input { ...input } {...rest} />;
};

const CalibrationForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Typography gutterBottom>First point</Typography>
      <ItemWrapper>
        <Item>
          <FormControl fullWidth>
            <InputLabel htmlFor="calibration-x1">
              Observed value
            </InputLabel>
            <Field name="x1" component={renderInputField} props={{ id: 'calibration-x1', type: 'number' }} />
          </FormControl>
        </Item>
        <Item>
          <FormControl fullWidth>
            <InputLabel htmlFor="calibration-y1">
              Measured value
            </InputLabel>
            <Field name="y1" component={renderInputField} props={{ id: 'calibration-y1', type: 'number' }} />
          </FormControl>
        </Item>
      </ItemWrapper>

      <Typography gutterBottom>Second point</Typography>
      <ItemWrapper>
        <Item>
          <FormControl fullWidth>
            <InputLabel htmlFor="calibration-x2">
              Observed value
            </InputLabel>
            <Field name="x2" component={renderInputField} props={{ id: 'calibration-x2', type: 'number' }} />
          </FormControl>
        </Item>
        <Item>
          <FormControl fullWidth>
            <InputLabel htmlFor="calibration-y2">
              Measured value
            </InputLabel>
            <Field name="y2" component={renderInputField} props={{ id: 'calibration-y2', type: 'number' }} />
          </FormControl>
        </Item>
      </ItemWrapper>
    </form>
  );
};

export default CalibrationForm;
