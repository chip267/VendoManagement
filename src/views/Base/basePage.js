import ROUTE_CONSTANT from "../../constants/route"
import { UserContext, UserProvider } from "../../context/UserContext"
import React, { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"

const BasePage = () => {
    const { pathname } = useLocation()
    return (
        <UserProvider>
            <div className='min-h-screen bg-gray-50'>
                {/* <div className="mx-[8%] py-[2rem]" > */}
                <Outlet />
            </div>
        </UserProvider>
    )
}

export default BasePage
