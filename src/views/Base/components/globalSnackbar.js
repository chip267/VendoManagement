// GlobalSnackbar.js
import React from "react";
import { Snackbar } from "@mui/material";
import { Slide } from "@mui/material";
import { Alert } from "@mui/material";

const getAlertMessage = ({ message, severity }) => {
    return <Alert severity={severity}>{message}</Alert>
}
function Transition(transitionProps) {
    return <Slide {...transitionProps} direction="up" />;
}
const GlobalSnackbar = ({ open, message, severity, onClose }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={onClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            TransitionComponent={Transition}
        >
            <Alert severity={severity}>{message}</Alert>
        </Snackbar>
    );
};

export default GlobalSnackbar;
