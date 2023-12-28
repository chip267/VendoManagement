import { createBrowserRouter } from "react-router-dom";
import ROUTE_CONSTANT from "./constants/route";
import Sidebar from "./views/Sidebar/sidebar"; //Home
import Login from "./views/Login/login";
import BasePage from "./views/Base/basePage";
import { UserApiController } from "./api/user";
import { redirect } from "react-router-dom";

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
                        // loader: () => redirectHome(),

                    },
                    {
                        path: ROUTE_CONSTANT.HOME,
                        element: <Sidebar />,
                        //Remove to undo login requirement
                        loader: () => requireLogin(ROUTE_CONSTANT.HOME),
                    }
                ]
        },
    ]
);

async function requireLogin(path) {
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

async function redirectHome() {
    // Check if user is logged in
    const response = await UserApiController.getCurrentUser();
    const user = response.user;
    if (user) {
        // If logged in, return to 
        console.log("User logged in. Redirecting to home page");
        return redirect(ROUTE_CONSTANT.HOME);
    }
    else
        return redirect(ROUTE_CONSTANT.AUTH.LOGIN);
}
export default router;