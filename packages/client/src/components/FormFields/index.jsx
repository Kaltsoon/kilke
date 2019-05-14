import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';

import { createComponent } from './utils';

const simpleMapProps = ({ input, inputProps, inputLabel, ...props }) => ({
  ...input,
  ...props,
});

export const FormFieldInput = createComponent(Input, simpleMapProps);
export const FormFieldSelect = createComponent(Select, simpleMapProps);
