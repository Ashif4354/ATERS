import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SnackBar = (props) => {
    return (
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.handleClose}>
            <Alert
                onClose={props.handleClose}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
            >
                Share link copied to Clipboard
            </Alert>
        </Snackbar>
    )
}

export default SnackBar;