import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import CreateOrderForm from '../../presentation/create-order-form';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { Typography } from '@material-ui/core';
import { validateForm, formatData } from './utils';

export const CreateWorkOrderDialog = (props) => {
  const { onClose, open, data, handleSave } = props;
  if (!data) {
    return 'Error: no data';
  }
  const formData = formatData(data);
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
          <IconButton onClick={onClose}>
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
          shipDate: '',
          cases: '',
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
      await createWorkOrder({ variables });
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