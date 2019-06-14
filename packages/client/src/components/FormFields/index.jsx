import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';

import { createComponent } from './utils';

const simpleMapProps = ({ field, form, inputProps, inputLabel, ...props }) => ({
  ...field,
  ...props,
});

export const FormFieldInput = createComponent(Input, simpleMapProps);
export const FormFieldSelect = createComponent(Select, simpleMapProps);
