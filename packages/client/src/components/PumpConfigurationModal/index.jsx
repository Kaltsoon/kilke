import React, { Fragment, Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import get from 'lodash/get';

import ApiAsync from '../ApiAsync';
import PumpConfigurationForm from '../PumpConfigurationForm';
import { submitConfiguration } from '../../state/pumps';
import { getPumpConfiguration } from '../../apiUtils';

const getPumpConfigurationPromiseFn = args => getPumpConfiguration(args);

const PumpAsync = ({ type, ...props }) => (
  <ApiAsync promiseFn={getPumpConfigurationPromiseFn} type={type} watch={type} {...props} />
);

const getInitialValues = config => {
  return {
    status: get(config, 'status') || 'off',
    manualRpm: get(config, 'manualRpm') || 0,
  };
};

const Form = reduxForm()(PumpConfigurationForm);

class PumpConfigurationModalBase extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
    };
  }

  onToggle = () => {
    this.setState(({ open }) => ({ open: !open }));
  };

  onClose = () => {
    this.setState({
      open: false,
    });
  };

  onSubmit = () => {
    this.props.onSubmit();
    this.onClose();
  }

  render() {
    const { children, type } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        <Dialog open={open} onClose={this.onClose} fullWidth>
          <DialogTitle>Edit pump configuration</DialogTitle>
          <DialogContent>
            <PumpAsync type={type}>
              {({ data, isLoading }) => {
                return (
                  !isLoading ? <Form initialValues={getInitialValues(data)} form={`pumpConfigurationForm.${type}`} /> : null
                );
              }}
            </PumpAsync>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onClose}>Cancel</Button>
            <Button onClick={this.onSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
        {children({
          onToggle: this.onToggle,
        })}
      </Fragment>
    );
  }
}

export default connect(
  null,
  (dispatch, { type }) => ({
    onSubmit: () => {
      dispatch(submitConfiguration(type));
    },
  }),
)(PumpConfigurationModalBase);
