import React from 'react';
import { Field } from 'formik';

import Select from '../Select';
import getFieldMeta from '../../utils/formik/getFieldMeta';
import isString from '../../utils/isString';

const SelectField = ({ name, helperText: helperTextProp, ...props }) => {
  return (
    <Field name={name}>
      {({ field, form }) => {
        const { touched, error } = getFieldMeta({ field, form });
        const showError = touched && !!error;

        const helperText =
          showError && isString(error) ? error : helperTextProp;

        return (
          <Select
            {...field}
            error={showError}
            helperText={helperText}
            {...props}
          />
        );
      }}
    </Field>
  );
};

export default SelectField;
