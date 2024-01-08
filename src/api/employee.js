import apiInstance from ".";

class EmployeeContorller {
    currentEmployee = null;
    async getEmployees(
        {
            limit = 10,
            page = 1,
            name = null,
            phoneNumber = null,
        }) {
        try {
            console.log("name is " + name);
            const response = await apiInstance.get("/api/employees", {
                params: {
                    limit: limit,
                    page: page,
                    name: name,
                    phoneNumber: phoneNumber,
                },
                withCredentials: true
            });
            //Convert from json


            if (response.status === 200) {
                return {
                    success: true,
                    data: response.data
                };
            }
            else {
                return {
                    success: false,
                    data: null
                };
            }
        } catch (error) {
            console.log("API error: " + error);
            return {
                success: false,
                data: null
            };
        }
    }
    async getEmployee(id) {
        try {
            const response = await apiInstance.get("/api/employees/" + id, { withCredentials: true });
            if (response.status === 200) {
                return {
                    success: true,
                    data: response.data
                };
            }
            else {
                return {
                    success: false,
                    data: null
                };
            }
        } catch (error) {
            console.log("API error: " + error);

            return {
                success: false,
                data: null
            };

        }
    }
    //set current employee
    setCurrentEmployee(employee) {
        this.currentEmployee = employee;
    }
    getCurrentEmployee() {
        return this.currentEmployee;
    }
    async changePassword(id, password) {
        try {
            const response = await apiInstance.post("/api/change-password/" + id, {
                password: password
            }, { withCredentials: true });
            return {
                success: true,
                data: response.data
            };
        }
        catch (error) {
            console.log("API error: " + error);
            return {
                success: false,
                data: null
            };
        }
    }
    async addEmployee(employee) {
        try {
            const response = await apiInstance.post("/api/employees", employee, { withCredentials: true });
            return {
                success: true,
                data: response.data
            };

        } catch (error) {
            console.log("API error: " + error);
            if (error.response.status === 400) {
                return {
                    success: false,
                    data: "400"
                };
            }

            return {
                success: false,
                data: null
            };

        }
    }
    async updateEmployee({
        _id,
        phoneNumber = null,
        name = null,
        address = null,
        salary = null,
        position = null,
    }) {
        try {
            const response = await apiInstance.patch("/api/employees/" + _id, {
                phoneNumber: phoneNumber,
                name: name,
                address: address,
                salary: salary,
                position: position,
            }, { withCredentials: true });
            return {
                success: true,
                data: response.data
            };

        } catch (error) {
            console.log("API error: " + error);
            return {
                success: false,
                data: null
            };

        }
    }
    async deleteEmployee(id) {
        try {
            const response = await apiInstance.delete("/api/employees/" + id, { withCredentials: true });
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.log("API error: " + error);
            return {
                success: false,
                data: null
            };
        }
    }
}
const EmployeeApiController = new EmployeeContorller();
export default EmployeeApiController;