import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';


const SimpleDialog = (props) => {
    const {open, setOpen } = props;
    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
        navigate('/signin');
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >

            <DialogTitle id="alert-dialog-title">
                {"Sign In to continue."}
            </DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    You need to sign in to continue. Click on the sign in button to signin/signup.
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    SignIn
                </Button>
            </DialogActions>
            
        </Dialog>
    )
}

export default SimpleDialog;