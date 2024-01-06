import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const ConfirmationDialog = ({
    open,
    onClose,
    header,
    message,
    onConfirm = null,
    onCancel = null,
    confirmButtonText = "Confirm",
    cancelButtonText = "Cancel",
    isWaiting = false,
    isConfirmDisabled = false,
    isCancelDisabled = false,
    waitingComponent = null
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle style={{ backgroundColor: '#2C7A51', color: 'white' }}>{header}</DialogTitle>
            <DialogContent sx={{ mt: 4 }}>
                {isWaiting ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {waitingComponent || <CircularProgress />}
                    </div>
                ) : (
                    message
                )}
            </DialogContent>
            <DialogActions>
                <Button style={{ color: '#A2B8AD' }} autoFocus onClick={onCancel} disabled={isWaiting || isCancelDisabled}>
                    {cancelButtonText}
                </Button>
                <Button style={{ color: '#2C7A51' }} onClick={onConfirm} disabled={isWaiting || isConfirmDisabled}>
                    {confirmButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
