
import apiInstance from ".";
import EmployeeApiController from "./employee";
import StatisticAPIController from "./statistic";
//UserController has user that is in sync with user context
//Used for path tracking and other things. 
class UserController {
    constructor() {
        this.user = null;
    }

    async login(username, password) {
        try {
            //Try to get user first. If user is already logged in, return user
            //This is to prevent multiple login and on reload

            //If user is not logged in, try to login
            const response = await apiInstance.post("/api/login", {
                username,
                password
            }, { withCredentials: true });
            //Set controller user
            if (response.status === 200) {
                this.user = { ...response.data };
                //Set cookies
                return {
                    success: true,
                    data: this.user
                };
            }
            else {
                return {
                    success: false,
                    data: null
                };
            }
        } catch (error) {
            return error;
        }
    }
    async logout() {
        try {

            const response = await apiInstance.post("/api/logout", {}, { withCredentials: true });
            if (response.status === 200) {
                this.user = null;
                EmployeeApiController.setCurrentEmployee(null);
                StatisticAPIController.clearCache();
                return {
                    success: true,
                    data: null
                };

            }
            return {
                success: false,
                data: null
            };

        } catch (error) {
            return error;
        }
    }
    async register(username, password) {
        try {
            const response = await apiInstance.post("/api/register", {
                username,
                password
            }, { withCredentials: true });
            return response;
        } catch (error) {
            return error;
        }
    }
    //Will return user if there is one. Otherwise attempt to fetch with current cookies.
    async getCurrentUser() {
        try {
            if (this.user) {
                console.log("API: User already fetched. Current user: ", this.user);
                return {
                    success: true,
                    user: this.user
                };
            }
            //Handle on reload, when there is cookies but no user
            const response = await apiInstance.get('/api/login', { withCredentials: true });
            if (response.status === 200) {
                //Check if user is null
                if (response.data.user) {
                    this.user = { ...response.data.user };
                    console.log("API: User fetched successfully. Current user: ", this.user);
                    return {
                        success: true,
                        user: this.user
                    };
                }
                else {
                    console.log("API: No user logged in");
                    return {
                        success: false,
                        user: null
                    };
                }
            }
            else {
                console.log("API: No user logged in");
                return {
                    success: false,
                    user: null
                };
            }
        } catch (error) {
            console.log("API: Error fetching user. Error: ", error);
            return error;
        }

    }
}

const UserApiController = new UserController();


export {
    UserApiController,

}