
import React, { useEffect } from "react"
import { useState } from "react"
import { createContext, useContext } from "react"
import { UserApiController } from "../api/user"
import { useRef } from "react"
export const UserContext = createContext(null);

export const useUserContext = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    //Called every time user changes
    useEffect(() => {
        if (!user && !UserApiController.user) {
            console.log("Context: No user logged in. Attempting to load user");
            loadUser();
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
        setUser
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};