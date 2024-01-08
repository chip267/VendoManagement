
import { UserContext, UserProvider } from "../../context/UserContext"
import React, { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { useState } from "react"
import { createContext, useContext } from "react"
import GlobalSnackbar from "./components/globalSnackbar"
import { GlobalConfirmDialogProvider } from "./componentContext/confirmDialog"
import { Global } from "@emotion/react"
import styles from "./basePage.module.scss"
import classNames from "classnames/bind"
const cx = classNames.bind(styles)
//Global snackbar context
export const GlobalSnackbarContext = createContext();
export const useGlobalSnackbar = () => useContext(GlobalSnackbarContext);
const BasePage = () => {
    const { pathname } = useLocation()
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: "",
        severity: "success"
    });
    const showSnackbar = (message, severity = "success") => {
        setSnackbarState({ open: true, message: message, severity: severity });
    };
    // Function to hide the snack bar
    const hideSnackbar = () => {
        setSnackbarState({ open: false, message: "", severity: "success" });
    };

    const contextValue = {
        showSnackbar,
        hideSnackbar,
    };
    useEffect(() => {
        document.title = 'Vendo Management System';
        return () => {
            document.title = 'React App';
        };
    }, [])


    return (
        <UserProvider>
            <GlobalConfirmDialogProvider>
                <GlobalSnackbarContext.Provider value={contextValue}>
                    <div className={cx('basePage') + " min-h-screen bg-gray-50"}>
                        <Outlet />
                        <GlobalSnackbar
                            open={snackbarState.open}
                            message={snackbarState.message}
                            severity={snackbarState.severity}
                            onClose={hideSnackbar}
                        />
                    </div>
                </GlobalSnackbarContext.Provider>
            </GlobalConfirmDialogProvider>
        </UserProvider>
    )
}

// <div className='min-h-screen bg-gray-50'>
//     <Outlet />
//     <GlobalSnackbar
//         open={snackbarState.open}
//         message={snackbarState.message}
//         severity={snackbarState.severity}
//         onClose={hideSnackbar}
//     />
//     <GlobalConfirmDialog />
// </div>
export default BasePage
