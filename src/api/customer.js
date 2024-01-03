import apiInstance from ".";


class CustomerController {
    async getCustomers(
        {
            page = 1,
            limit = 10,
            name = null,
            phoneNumber = null

        }
    ) {
        try {
            const response = await apiInstance.get("/api/customers",
                {
                    withCredentials: true,
                    params: { page, limit, name, phoneNumber }
                }
            );
            if (response.status === 200 || response.status === 304) {
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
    async getCustomer(id) {
        try {
            const response = await apiInstance.get("/api/customers/" + id, { withCredentials: true });
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
    async addCustomer(customer) {
        try {
            const response = await apiInstance.post("/api/customers", customer, { withCredentials: true });
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
    async updateCustomer(customer) {
        try {
            const response = await apiInstance.put("/api/customers/" + customer.id, customer, { withCredentials: true });
            return response;
        } catch (error) {
            return error;
        }
    }
    async deleteCustomer(id) {
        try {
            const response = await apiInstance.delete("/api/customers/" + id, { withCredentials: true });
            return response;
        } catch (error) {
            return error;
        }
    }
}
const CustomerApiController = new CustomerController();
export default CustomerApiController;