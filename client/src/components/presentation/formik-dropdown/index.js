import React from 'react';
import { Field } from 'formik';
import { MenuItem } from '@material-ui/core';
import get from 'lodash.get';
import { TextField } from 'formik-material-ui';

const FormikDropdown = (props) => {
  const { name, label, initial, required } = props;
  const data = get(props, "data", []);
  const initialVal = initial[name];
  const isRequired = required ? true : null;
  return (
    <Field type="text" required={isRequired} name={name} label={label} select component={TextField}
      fullWidth value={initialVal}
      InputLabelProps={{
        shrink: true,
      }}
    >
      {data.map(option => {
        return (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        )
      })}
    </Field>
  )
}

export default FormikDropdown