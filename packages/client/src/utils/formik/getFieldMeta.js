import { getIn } from 'formik';

const getFieldMeta = ({ field, form }) => {
  const name = field.name;
  const formErrors = form.errors || {};
  const formTouched = form.touched || {};

  const error = name ? getIn(formErrors, name) : undefined;

  const touched =
    name && getIn(formTouched, name) !== undefined
      ? getIn(formTouched, name)
      : false;

  return {
    error,
    touched,
  };
};

export default getFieldMeta;
