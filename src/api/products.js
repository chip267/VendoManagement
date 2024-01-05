import apiInstance from ".";

class ProductController {
    constructor() {
        this.products = null;
    }

    async getProducts({
        page = 1,
        limit = 10,
        nameFilter = null,
        typeFilter = null,
        sellPriceFilter = null,
    }) {
        try {
            const response = await apiInstance.get("/api/products", { withCredentials: true, params: { page, limit, nameFilter, typeFilter, sellPriceFilter } });
            if (response.status === 200) {
                return {
                    success: true,
                    data: response.data
                };
            }
            else {
                console.log(response);
                return {
                    success: false,
                    data: null
                };
            }
        } catch (error) {
            return error;
        }
    }
    async getProduct(id) {
        try {
            const response = await apiInstance.get("/api/products/" + id, { withCredentials: true });
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
    async addProduct(product) {
        try {
            const response = await apiInstance.post("/api/products", product, { withCredentials: true });
            return response;
        } catch (error) {
            return error;
        }
    }
    async updateProduct(product) {
        try {
            const response = await apiInstance.put("/api/products/" + product.id, product, { withCredentials: true });
            return response;
        } catch (error) {
            return error;
        }
    }
    async deleteProduct(id) {
        try {
            const response = await apiInstance.delete("/api/products/" + id, { withCredentials: true });
            if (response.status === 200) {
                return {
                    success: true,
                    data: response.data
                };
            }
            else if (response.status === 404) {
                console.log("Product not found");
                return {
                    success: false,
                    data: null
                };
            } else {
                return {
                    success: false,
                    data: null
                };
            }
        } catch (error) {
            return error;
        }
    }
}

const ProductApiController = new ProductController();
export default ProductApiController;