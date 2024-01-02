import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const ConfirmationDialog = ({
    open,
    onClose,
    header,
    message,
    onConfirm = null,
    onCancel = null,
    confirmButtonText = "Confirm",
    cancelButtonText = "Cancel",
}
) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle style={{ backgroundColor: '#2C7A51', color: 'white' }}>{header}</DialogTitle>
            <DialogContent>{message}</DialogContent>
            <DialogActions>
                <Button style={{ color: '#A2B8AD' }} autoFocus onClick={onCancel}>
                    {cancelButtonText}
                </Button>
                <Button style={{ color: '#2C7A51' }} onClick={onConfirm}>
                    {confirmButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
