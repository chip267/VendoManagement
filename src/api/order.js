import apiInstance from ".";

class OrderController {
    async getOrders() {
        try {
            const response = await apiInstance.get("/api/orders", { withCredentials: true });
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
    async getOrder(id) {
        try {
            const response = await apiInstance.get("/api/orders/" + id, { withCredentials: true });
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
    async getOrderDetail(orderId, detailId) {
        try {
            const response = await apiInstance.get("/api/orders/" + orderId + "/" + detailId, { withCredentials: true });
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
    async addOrder(order) {
        try {
            const response = await apiInstance.post("/api/orders", order, { withCredentials: true });
            return response;
        } catch (error) {
            return error;
        }
    }
    async updateOrder(order) {
        try {
            const response = await apiInstance.put("/api/orders/" + order.id, order, { withCredentials: true });
            return response;
        } catch (error) {
            return error;
        }
    }
    async deleteOrder(id) {
        try {
            const response = await apiInstance.delete("/api/orders/" + id, { withCredentials: true });
            return response;
        } catch (error) {
            return error;
        }
    }
}

const OrderApiController = new OrderController();
export default OrderApiController;