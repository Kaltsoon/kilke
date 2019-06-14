import React, { createElement, useRef } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import get from 'lodash/get';
import isString from 'lodash/isString';

const generateId = prefix =>
  `${prefix}__${Math.round(Math.random() * 100000).toString()}`;

export const createComponent = (Component, mapProps) => {
  const InputComponent = props => {
    const idRef = useRef();

    if (!idRef.current) {
      idRef.current = generateId('FormField');
    }

    const { disabled, inputLabel, label, helperText, field, form } = props;
    const errorMessage = get(form, ['errors', field.name]);
    const hasError = isString(errorMessage);
    const showError = hasError && !!get(form, ['touched', field.name]);
    const id = props.id || idRef.current;

    const children = createElement(Component, mapProps({ id, ...props }));

    return (
      <FormControl error={showError} disabled={disabled} fullWidth>
        {label ? <FormLabel htmlFor={id}>{label}</FormLabel> : null}
        {inputLabel ? <InputLabel htmlFor={id}>{inputLabel}</InputLabel> : null}
        {children}
        {helperText || showError ? (
          <FormHelperText>
            {showError ? errorMessage : helperText}
          </FormHelperText>
        ) : null}
      </FormControl>
    );
  };

  InputComponent.displayName = `FormField${Component.name}`;

  return InputComponent;
};
