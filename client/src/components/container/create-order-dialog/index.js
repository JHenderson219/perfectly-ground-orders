import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import get from 'lodash.get';
import dayjs from 'dayjs';
import CreateOrderForm from '../../presentation/create-order-form';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { Typography } from '@material-ui/core';


const dateIsValid = (dateStr) => {
  const dateRegex = /\d{4}-\d{2}-\d{2}/g;
  return dateRegex.test(dateStr);
}
const validateForm = (values = {}) => {
  const errors = {};
  const { shipDate, cases, brewMethodID, coffeeID, caseTypeID, notes } = values; 
  const MAX_NOTES_LENGTH = 255;
  if (!shipDate || !dateIsValid(shipDate)) {
    errors.shipDate = 'Invalid Ship Date';
  }
  if (!cases || cases < 1) {
    errors.cases = 'Invalid number of cases';
  }
  if (!brewMethodID) {
    errors.brewMethodID = "Brew method is required";
  }
  if (!coffeeID) {
    errors.coffeeID = "Coffee type is required";
  }
  if (!caseTypeID) {
    errors.caseTypeID = "Packets per case is required";
  }
  if (notes.length > MAX_NOTES_LENGTH) {
    errors.notes = "Notes must be shorter than 255 characters"
  }
  return errors;
}

export const CreateWorkOrderDialog = (props) => {
  const { onClose, open, data, handleSave } = props;
  if (!data) {
    return null;
  }
  const brewMethods = get(data, 'brewMethods', []).map(brewMethod => {
    return { value: brewMethod.id, label: brewMethod.name }
  });;
  const coffees = get(data, 'coffees', []).map(coffee => {
    return { value: coffee.id, label: coffee.name }
  });
  const caseTypes = get(data, 'caseTypes', []).map(caseType => {
    return { value: caseType.id, label: caseType.capacity }
  });
  const formData = {
    brewMethods,
    coffees,
    caseTypes,
  }
  const style = {
    row: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
  }
  return (
    <Dialog fullWidth maxWidth={'lg'} onClose={onClose} open={open}>
      <DialogTitle>
        <div style={style.row}>
        <Typography variant="h6"> Perfectly Ground Work Orders </Typography>
        <IconButton  onClick={onClose}>
          <CloseIcon />
        </IconButton>
        </div>
        </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Instructional text goes here - etc
        </DialogContentText>
        <CreateOrderForm initial={{
          notes: '',
          shipDate: dayjs().format('YYYY-MM-DD'),
          cases: 1,
          caseTypeID: '',
          brewMethodID: '',
          coffeeID: ''
        }}
          onSubmit={handleSave}
          data={formData}
          validate={validateForm}
        />
      </DialogContent>
    </Dialog>
  )
}

const CREATE_WORK_ORDER = gql`
  mutation CreateWorkOrder ($brewMethodID: ID!, $coffeeID: ID!, $shipDate: Date! $cases: Int!, $caseTypeID: ID!, $notes: String, $hasPriority: Boolean){
    createWorkOrder(brewMethodID: $brewMethodID, coffeeID: $coffeeID, shipDate: $shipDate, cases: $cases, caseTypeID: $caseTypeID, notes: $notes, hasPriority: $hasPriority) {
      id
    }
  }
`;
const CreateWorkOrderWrapper = (props) => {
  const { open, onClose, data, onSave, onError } = props;
  const handleSave = (createWorkOrder, results) => async (variables, formMethods) => {
    try {
      await createWorkOrder({variables});
      onSave();
    } catch (error) {
      console.error('caught error', error);
      onError(error);
    }
  }
  return (
    <Mutation mutation={CREATE_WORK_ORDER} >
      {(createWorkOrder, results) => {
        return (
          <CreateWorkOrderDialog data={data} onClose={onClose} open={open} 
          handleSave={handleSave(createWorkOrder, results)} />
        )
      }}
    </Mutation>
  )
}

export default CreateWorkOrderWrapper;