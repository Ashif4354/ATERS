import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const BasicDatePicker = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label={props.label} value={props.value} onChange={props.setDate} helperText={false ? 'Date is required' : ''}/>
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default BasicDatePicker;

