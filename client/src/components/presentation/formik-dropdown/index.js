import React from 'react';
import { Field } from 'formik';
import { MenuItem } from '@material-ui/core';
import get from 'lodash.get';
import { TextField } from 'formik-material-ui';

const FormikDropdown = (props) => {
  const { name, label, initial = {}, required } = props;
  const data = get(props, "data", []);
  const initialVal = get(initial, name, '');
  const isRequired = required ? true : null;
  return (
    <Field type="text" required={isRequired} name={name} label={label} select 
    component={TextField} fullWidth value={initialVal}
      InputLabelProps={{
        shrink: true,
      }}
    >
      {data.map((option = {}) => {
        const { value, label } = option;
        if (!value || !label) {
          return null;
        }
        return (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        )
      })}
    </Field>
  )
}

export default FormikDropdown