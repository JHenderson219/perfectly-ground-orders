import React from 'react';
import FormikDropdown from '../../presentation/formik-dropdown';
import { Field } from 'formik';
import { TextField, Checkbox } from 'formik-material-ui';
import { FormControlLabel } from '@material-ui/core';
const Coffee = (props = {}) => {
  const { style = {}, coffees, initial } = props;
  return (
    <div style={style.formColumn}>
      <FormikDropdown data={coffees} name={"coffeeID"} label={"Coffee"}
        fullWidth initial={initial} required={true} />
    </div>
  )
}

const BrewMethod = (props = {}) => {
  const { style = {}, brewMethods, initial } = props;
  return (
    <div style={style.formColumn}>
      <FormikDropdown data={brewMethods} name={"brewMethodID"}
        label={"Brew Method"} fullWidth initial={initial} required={true} />
    </div>
  )
}

export const CoffeeAndMethodRow = (props = {}) => {
  const { style = {} } = props;
  return (
    <div style={style.formRow}>
      <Coffee {...props} />
      <BrewMethod {...props} />
    </div>
  );
}

export const ShipDate = (props = {}) => {
  const { style = {} } = props;
  return (
    <div style={style.formRow}>
      <Field id="shipDate" label="Ship Date" name="shipDate" type="date" 
       fullWidth component={TextField} required={true}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  )
}

export const CaseCount = (props) => {
  const { style = {} } = props;
  const MIN_CASE_SIZE = 1;
  return (
    <div style={style.formColumn}>
      <Field inputProps={{ min: MIN_CASE_SIZE }}
        label="Number of Cases" name="cases" type="number" component={TextField}
        required={true} />
    </div>
  )
}

export const CaseTypesDropdown = (props = {}) => {
  const { style = {}, initial, caseTypes } = props;
  return (
    <div style={style.formColumn}>
      <FormikDropdown data={caseTypes} name={"caseTypeID"} label={"Packets per Case"}
        fullWidth initial={initial} required={true} />
    </div>
  )
}

export const PriorityCheckboxRow = (props = {}) => {
  const { style = {} } = props
  return (
    <div style={style.formRow}>
    <FormControlLabel 
      control={<Field label="Priority" name="hasPriority" component={Checkbox} />}
      label="Priority"
    />
  </div>
  )
}