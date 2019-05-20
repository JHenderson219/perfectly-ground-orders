import React from 'react';
import Date from '../date';
import Logo from '../logo';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
const DateTitle = (props) => {
  return (
    <div style={props.style}>
      <Date />
      <Typography style={{ padding: "1em" }} variant="h5"> Perfectly Ground Work Orders </Typography>
    </div>
  )
}

const Header = (props) => {
  const { toggleModal, logo } = props;
  const classes = {
    header: {
      padding: "1em 0 1em 0"
    },
    dateTitle: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttonContainer: {
      display: 'flex',
      alignItems: 'center'
    }
  }
  const style = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  };
  return (
    <header style={classes.header}>
      <div>
        <Logo image={logo} />
      </div>
      <div style={style}>
        <DateTitle style={classes.dateTitle}/>
        <div style={classes.buttonContainer}>
          <Button variant="contained" color="primary" onClick={toggleModal}> Create Order </Button>
        </div>
      </div>
    </header>
  )
}

export default Header;