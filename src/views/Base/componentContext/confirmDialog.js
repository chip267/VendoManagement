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
        isWaiting: false,
        isConfirmDisabled: false,
        isCancelDisabled: false,
        waitingComponent: null,

    });

    const showDialog = ({
        header,
        message,
        onConfirm = null,
        onCancel = null,
        confirmButtonText = "Confirm",
        cancelButtonText = "Cancel",
        isWaiting = false,
        isConfirmDisabled = false,
        isCancelDisabled = false,
        waitingComponent = null,

    }) => {
        setDialogState({
            open: true,
            header,
            message,
            onConfirm,
            onCancel,
            confirmButtonText,
            cancelButtonText,
            isWaiting,
            isConfirmDisabled,
            isCancelDisabled,
            waitingComponent,
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
            isWaiting: false,
            isConfirmDisabled: false,
            isCancelDisabled: false,
            waitingComponent: null,

        });
    };
    const setWaitting = ({
        isWaiting = false,
        waitingComponent = null,
    }) => {
        setDialogState({
            ...dialogState,
            isWaiting,
            waitingComponent,
        });
    };
    const contextValue = {
        showDialog,
        hideDialog,
        setWaitting,
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
                isWaiting={dialogState.isWaiting}
                isConfirmDisabled={dialogState.isConfirmDisabled}
                isCancelDisabled={dialogState.isCancelDisabled}
                waitingComponent={dialogState.waitingComponent}

            />
            {children}
        </GlobalConfirmDialogContext.Provider>
    );
};
