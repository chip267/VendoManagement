import React, { createContext, useContext, useState } from 'react';
import ConfirmationDialog from '../../GeneralComponents/ConfirmDialog';


export const GlobalConfirmDialogContext = createContext();
export const useGlobalConfirmDialog = () => useContext(GlobalConfirmDialogContext);

export const GlobalConfirmDialogProvider = ({ children }) => {
    const [dialogState, setDialogState] = useState({
        open: false,
        header: "",
        message: "",
        onConfirm: null,
        onCancel: null,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
    });

    const showDialog = ({
        header,
        message,
        onConfirm = null,
        onCancel = null,
        confirmButtonText = "Confirm",
        cancelButtonText = "Cancel",
    }) => {
        setDialogState({
            open: true,
            header,
            message,
            onConfirm,
            onCancel,
            confirmButtonText,
            cancelButtonText,
        });
    };

    const hideDialog = () => {
        setDialogState({
            open: false,
            header: "",
            message: "",
            onConfirm: null,
            onCancel: null,
            confirmButtonText: "Confirm",
            cancelButtonText: "Cancel",
        });
    };

    const contextValue = {
        showDialog,
        hideDialog,
    };

    return (
        <GlobalConfirmDialogContext.Provider value={contextValue}>
            <ConfirmationDialog
                open={dialogState.open}
                header={dialogState.header}
                message={dialogState.message}
                onConfirm={dialogState.onConfirm ? dialogState.onConfirm : hideDialog}
                onCancel={dialogState.onCancel ? dialogState.onCancel : hideDialog}
                confirmButtonText={dialogState.confirmButtonText}
                cancelButtonText={dialogState.cancelButtonText}
                onClose={hideDialog}
            />
            {children}
        </GlobalConfirmDialogContext.Provider>
    );
};
