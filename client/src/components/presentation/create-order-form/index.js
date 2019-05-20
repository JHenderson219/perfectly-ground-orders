import React from 'react';
import FormikDropdown from '../../presentation/formik-dropdown';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Checkbox } from 'formik-material-ui';
import { FormControlLabel, Button } from '@material-ui/core';

const ShipDate = (props = {}) => {
  const { style } = props;
  return (
    <div style={style.formRow}>
      <Field id="shipDate" label="Ship Date" name="shipDate" type="date" fullWidth
        component={TextField} required={true}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  )
}

const CoffeeAndMethod = (props = {}) => {
  const { style, initial, coffees, brewMethods } = props;
  console.log(props)
  return (
    <div style={style.formRow}>
      <div style={style.formColumn}>
        <FormikDropdown data={coffees} name={"coffeeID"} label={"Coffee"} fullWidth
          initial={initial} required={true} />
      </div>
      <div style={style.formColumn}>
        <FormikDropdown data={brewMethods} name={"brewMethodID"} label={"Brew Method"}
          fullWidth initial={initial} required={true} />
      </div>
    </div>
  );
}

const CaseCount = (props) => {
  const { style } = props;
  const MIN_CASE_SIZE = 1;
  return (
    <div style={style.formColumn}>
      <Field inputProps={{ min: MIN_CASE_SIZE }}
        label="Number of Cases" name="cases" type="number" component={TextField}
        required={true} />
    </div>
  )
}

const TypesDropdown = (props = {}) => {
  const { style, initial, caseTypes } = props;
  return (
    <div style={style.formColumn}>
      <FormikDropdown data={caseTypes} name={"caseTypeID"} label={"Packets per Case"}
        fullWidth initial={initial} required={true} />
    </div>
  )
}
const CreateOrderForm = (props) => {
  const { initial, validate, onSubmit, data } = props;

  const style = {
    outerColumn: {
      display: 'flex',
      flexDirection: 'column',
    },
    formColumn: {
      display: 'flex',
      flexDirection: 'column',
      flex: '0 1 48%',
    },
    formRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex: '0 1 48%',
      padding: "0.5em 0 0.5em 0"
    }
  }
  const mergedProps = Object.assign({}, props, data, {style});
  return (
    <Formik initialValues={initial} validate={validate} onSubmit={onSubmit}>
      {({ isSubmitting }) => {
        return (
          <Form>
            <div style={style.outerColumn}>
              <CoffeeAndMethod {...mergedProps} />
              <div style={style.formRow}>
                <ShipDate {...mergedProps} />
                <div style={style.formRow}>
                  <CaseCount {...mergedProps} />
                  <TypesDropdown {...mergedProps} />
                </div>
              </div>
            </div>
            <div style={style.formRow}>
              <Field label="Notes" name="notes" type="text" component={TextField} fullWidth />
            </div>
            <div style={style.formRow}>
              <FormControlLabel
                control={<Field label="Priority" name="hasPriority" component={Checkbox} />}
                label="Priority"
              />
            </div>
            <Button variant="contained" type="submit" color="primary" disabled={isSubmitting}>
              Create Work Order
            </Button>
          </Form>
        )
      }}
    </Formik>
  )
}

export default CreateOrderForm;