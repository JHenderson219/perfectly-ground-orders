import React from 'react';
import dayjs from 'dayjs';
import { Typography } from '@material-ui/core';

const CalendarDate = () => {
  const date = dayjs();
  const month = date.format('MMM');
  const day = date.format('D');
  const style = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'lightgrey',
    width: '4em',
    height: '4em',
    justifyContent: 'center',
    alignItems: 'center'
  }
  return (
  <div style={style}>
    <Typography> {month} </Typography>
    <Typography variant="h6"> {day} </Typography>
  </div>
  )
}

export default CalendarDate;