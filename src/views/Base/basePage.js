import ROUTE_CONSTANT from "../../constants/route"
import { UserContext, UserProvider } from "../../context/UserContext"
import React, { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Snackbar } from "@mui/material"
import { useState } from "react"
import { createContext, useContext } from "react"
import { Slide } from "@mui/material"
import { Alert } from "@mui/material"
//A global snack bar that will be exported so other components can use it
export const GlobalSnackbarContext = createContext();

// Custom hook to use the global snack bar context
export const useGlobalSnackbar = () => useContext(GlobalSnackbarContext);
const getAlertMessage = ({ message, severity }) => {
    return <Alert severity={severity}>{message}</Alert>
}
function Transition(transitionProps) {
    return <Slide {...transitionProps} direction="top" />;
}
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
    return (
        <UserProvider>
            <GlobalSnackbarContext.Provider value={contextValue}>
                <div className='min-h-screen bg-gray-50'>
                    {/* <div className="mx-[8%] py-[2rem]" > */}
                    <Outlet />
                    <Snackbar
                        open={snackbarState.open}
                        autoHideDuration={2000}
                        onClose={hideSnackbar}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                        TransitionComponent={Transition}
                    >
                        {getAlertMessage({ message: snackbarState.message, severity: snackbarState.severity })}
                    </Snackbar>
                </div>
            </GlobalSnackbarContext.Provider>
        </UserProvider>
    )
}


export default BasePage
