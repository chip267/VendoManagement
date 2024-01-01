import { createBrowserRouter } from "react-router-dom";
import ROUTE_CONSTANT from "./constants/route";
import Sidebar from "./views/Sidebar/sidebar"; //Home
import Login from "./views/Login/login";
import BasePage from "./views/Base/basePage";
import { UserApiController } from "./api/user";
import { redirect } from "react-router-dom";
import { Navigate } from "react-router-dom";
const router = createBrowserRouter(
    [
        {
            path: ROUTE_CONSTANT.BASE,
            element: <BasePage />,
            children:
                [
                    {
                        path: ROUTE_CONSTANT.AUTH.LOGIN,
                        element: <Login />,
                        // send to home if logged in
                        loader: () => toHome(),


                    },
                    {
                        path: ROUTE_CONSTANT.HOME,
                        element: <Sidebar />,
                        //Remove to undo login requirement
                        loader: () => requireLogin(),
                    },
                    //Any other routes here
                    {
                        path: "*",
                        element: <Navigate to={ROUTE_CONSTANT.HOME} />,
                    }
                ]
        },
    ]
);
async function requireLogin() {
    // Check if user is logged in
    const response = await UserApiController.getCurrentUser();
    const user = response.user;
    if (!user) {
        // If logged in, return to 
        console.log("User not logged in. Redirecting to login page");
        return redirect(ROUTE_CONSTANT.AUTH.LOGIN);
    }
    else
        return null;
}
async function toHome() {
    // Check if user is logged in
    const response = await UserApiController.getCurrentUser();
    const user = response.user;
    if (user) {
        // If logged in, return to 
        console.log("User logged in. Redirecting to home page");
        return redirect(ROUTE_CONSTANT.HOME);
    }
    else
        return null;
}

export default router;