
import React, { useEffect } from "react"
import { useState } from "react"
import { createContext, useContext } from "react"
import { UserApiController } from "../api/user"
import { useRef } from "react"
export const UserContext = createContext(null);

export const useUserContext = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [paginationLimit, setPaginationLimit] = useState(3);
    //Called every time user changes
    useEffect(() => {
        if (!user && !UserApiController.user) {
            console.log("Context: No user logged in. Attempting to load user");
            loadUser();
        }
        //If user in context is null but user in api controller is not null
        else if (!user && UserApiController.user) {
            console.log("Context: User loaded from api controller");
            setUser(UserApiController.user);
        }
    }, [user]);

    async function loadUser() {
        try {
            const response = await UserApiController.getCurrentUser();
            if (response.success === true) {
                const userData = response.user;
                if (userData) {
                    console.log("Context: User loaded successfully");
                    setUser(userData);
                }
                else {
                    console.log("Context: Load attempt failed. No user logged in");
                }
            } else {
                console.log("Context: Load attempt failed. No user logged in");
            }
        } catch (error) {
            console.error("Context: Load attempt error. Error: ", error);
        }
    }
    const value = {
        user,
        setUser,
        paginationLimit,
        setPaginationLimit
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};