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
            const response = await apiInstance.get("/api/products?page=" + page + "&limit=" + limit, { withCredentials: true });
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
            //Check if product is valid

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
            return response;
        } catch (error) {
            return error;
        }
    }
}

const ProductApiController = new ProductController();
export default ProductApiController;