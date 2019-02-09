import { Field, FieldArray } from 'redux-form';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Flex, { FlexItem } from '../Flex';
import Spacing from '../Spacing';

const renderTextField = ({ input, label, type = 'text' }) => (
  <TextField {...input} label={label} type={type} fullWidth />
);

const ItemSpacing = styled(Spacing)`
  width: 100%;
  display: block;
`;

const Item = styled(ListItem)`
  display: block !important;
`;

const renderSensorFields = ({ fields }) => {
  const onAddSensor = useCallback(
    () => {
      fields.push({});
    },
    [fields],
  );

  return (
    <>
      <Card>
        <List>
          {fields.map((sensor, index) => (
            <Item key={index} divider>
              <ItemSpacing marginBottom={2}>
                <Field
                  name={`${sensor}.type`}
                  component={renderTextField}
                  label="Type"
                />
              </ItemSpacing>
              <ItemSpacing marginBottom={2}>
                <Typography gutterBottom>First calibration point</Typography>
                <Flex>
                  <FlexItem grow={1} paddingRight={1}>
                    <Field
                      name={`${sensor}.x1`}
                      component={renderTextField}
                      label="Raw value"
                      type="number"
                    />
                  </FlexItem>
                  <FlexItem grow={1} paddingLeft={1}>
                    <Field
                      name={`${sensor}.y1`}
                      component={renderTextField}
                      label="Real value"
                      type="number"
                    />
                  </FlexItem>
                </Flex>
              </ItemSpacing>
              <ItemSpacing marginBottom={2}>
                <Typography gutterBottom>Second calibration point</Typography>
                <Flex>
                  <FlexItem grow={1} paddingRight={1}>
                    <Field
                      name={`${sensor}.x2`}
                      component={renderTextField}
                      label="Raw value"
                      type="number"
                    />
                  </FlexItem>
                  <FlexItem grow={1} paddingLeft={1}>
                    <Field
                      name={`${sensor}.y2`}
                      component={renderTextField}
                      label="Real value"
                      type="number"
                    />
                  </FlexItem>
                </Flex>
              </ItemSpacing>
              <Flex justifyEnd>
                <Button
                  onClick={() => {
                    fields.remove(index);
                  }}
                >
                  Remove
                </Button>
              </Flex>
            </Item>
          ))}
          <ListItem>
            <Button
              color="primary"
              variant="contained"
              type="button"
              onClick={onAddSensor}
            >
              Add sensor
            </Button>
          </ListItem>
        </List>
      </Card>
    </>
  );
};

const Sensors = () => {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Sensors
      </Typography>
      <FieldArray component={renderSensorFields} name="sensors" />
    </>
  );
};

export default Sensors;
