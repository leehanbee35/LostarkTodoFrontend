import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} {...props} />;
});

export default function Notification({ message, open, handleClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right', 
      }}
      TransitionComponent={Slide}
      TransitionProps={{
        direction: 'left',
      }}
      message = {message}
      style={{ position: 'fixed', top:77, height:50 }}
    >
      {/* <Alert onClose={handleClose} severity="success">
        {message}
      </Alert> */}
    </Snackbar>
  );
}
