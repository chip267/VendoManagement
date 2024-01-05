import apiInstance from ".";



class EmployeeContorller {
    currentEmployee = null;
    async getEmployees({ limit = 10, page = 1, sortBy = "name", sort = "asc", search = "" } = {}) {
        try {
            const response = await apiInstance.get("/api/employees", { withCredentials: true });
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
            return error;
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
            return error;
        }
    }
    //set current employee
    setCurrentEmployee(employee) {
        this.currentEmployee = employee;
    }
    getCurrentEmployee() {
        return this.currentEmployee;
    }
    async addEmployee(employee) {
        try {
            const response = await apiInstance.post("/api/employees", employee, { withCredentials: true });
            return response;
        } catch (error) {
            return error;
        }
    }
    async updateEmployee(employee) {
        try {
            const response = await apiInstance.put("/api/employees/" + employee.id, employee, { withCredentials: true });
            return response;
        } catch (error) {
            return error;
        }
    }
    async deleteEmployee(id) {
        try {
            const response = await apiInstance.delete("/api/employees/" + id, { withCredentials: true });
            return response;
        } catch (error) {
            return error;
        }
    }
}
const EmployeeApiController = new EmployeeContorller();
export default EmployeeApiController;