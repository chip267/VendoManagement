import apiInstance from ".";

class ProductController {
    constructor() {
        this.products = null;
    }

    async getProducts({
        page = 1,
        limit = 10,
        productName = null,
        type = null,
        sellPriceFilter = null,
    }) {
        try {
            //If any of the params is null, it will be ignored and set to null
            if (type)
                if (type.toLowerCase() === "all") type = null;

            const response = await apiInstance.get("/api/products", {
                withCredentials: true, params: {
                    page,
                    limit,
                    productName,
                    type,
                    sellPriceFilter
                }
            });

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
    async updateProduct({
        _id,
        productName = null,
        type = null,
        sellPrice = null,
        description = null,
        productAction = null,
        productActionQuantity = null,
    }) {
        //Quantity cannot simply be changed
        //To add, must supply field: productAction[action] = "add" || "reduce" and productAction[quantity] = number
        if (productAction) {
            //Check if is add or reduce
            if (productAction === "add" || productAction === "reduce") {
                productAction = {
                    action: productAction,
                    quantity: productActionQuantity
                };
            }
            else {
                productAction = null;

            }
        }
        const updateData = {
            productName,
            type,
            sellPrice,
            description,
            productAction
        };
        //Remove null
        Object.keys(updateData).forEach(key => updateData[key] === null && delete updateData[key]);
        try {
            const response = await apiInstance.patch("/api/products/" + _id,
                updateData
                , { withCredentials: true });
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