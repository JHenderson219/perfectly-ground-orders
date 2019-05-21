import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Checkbox } from 'formik-material-ui';
import {  Button } from '@material-ui/core';
import { CoffeeAndMethodRow,
        ShipDate, 
        CaseCount, 
        CaseTypesDropdown,
        PriorityCheckboxRow } from './fields';



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
  const mergedProps = Object.assign({}, props, data, { style });
  return (
    <Formik initialValues={initial} validate={validate} onSubmit={onSubmit}>
      {({ isSubmitting }) => {
        return (
          <Form>
            <div style={style.outerColumn}>
              <CoffeeAndMethodRow {...mergedProps} />
              <div style={style.formRow}>
                <ShipDate {...mergedProps} />
                <div style={style.formRow}>
                  <CaseCount {...mergedProps} />
                  <CaseTypesDropdown {...mergedProps} />
                </div>
              </div>
            </div>
            <div style={style.formRow}>
              <Field label="Notes" name="notes" type="text" component={TextField} fullWidth />
            </div>
            <PriorityCheckboxRow />
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