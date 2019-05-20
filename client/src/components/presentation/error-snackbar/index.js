import React from 'react';
import { Snackbar, IconButton } from '@material-ui/core';
import get from 'lodash.get';
import CloseIcon from '@material-ui/icons/Close';

const ErrorSnackbar = (props) => {
  const { error, handleClose } = props;
  const isOpen = error ? true : false;
  const message = get(error, 'message', '');
  return (
    <Snackbar 
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={isOpen}
    message={message} 
    action={[
      <IconButton
      key="close"
      aria-label="Close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon />
    </IconButton>
    ]}
    />
  )
}

export default ErrorSnackbar