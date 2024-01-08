import React, { useState } from "react";
import styles from "./products.module.scss";
import classNames from "classnames/bind";
import Product from "./components/product";
import ProductCart from "./components/productCart";
import ProductApiController from "../../api/products";
import ListWithLoading from "../GeneralComponents/ListWithLoading";
import AddProductForm from "./components/addProductForm";
import { Pagination, Snackbar } from "@mui/material";
import { useEffect } from "react";
import OrderApiController from "../../api/order";
import { UserApiController } from "../../api/user";
import { CircularProgress } from "@mui/material";
import { useGlobalSnackbar } from "../Base/basePage";
import { useGlobalConfirmDialog } from "../Base/componentContext/confirmDialog";
import DeleteProductButton from "./components/productAction/deleteProductButton";
import { useUserContext } from "../../context/UserContext";
import QuantitySelector from "./components/productAction/addDialog";
const cx = classNames.bind(styles);

//PRODUCT PAGE CONSTANTS:

let totalCounts = 0;
// Define the options for the selection bar
const options = [
    { value: "all", label: "All products" },
    { value: "hard-drive", label: "Hard drive" },
    { value: "ssd", label: "SSD" },
    { value: "ram", label: "Ram" },
    { value: "rom", label: "Rom" },
];
const taxRate = 0.03;
const transitionTime = 500;
//#############################################

//Store products will include current page products, next page number and previous page number.
//And total counts of products.
//Each time a page change happens, we will update store products by calling api.
//Get total counts of products from api


const ProductSaleFront = () => {
    const { paginationLimit } = useUserContext();
    // Option for the type bar.
    const [selectedFilterOption, setSelectedFilterOption] = useState('all');
    //For product action
    const [isQuantitySelectorOpen, setIsQuantitySelectorOpen] = useState(false);
    //For order section
    const [isOrdering, setIsOrdering] = useState(false);
    const [orderCustomerId, setOrderCustomerId] = useState(null);
    //Used to check if customer buy at store,if yes, set order status to  "Delivered"
    const [orderStatus, setOrderStatus] = useState(null);
    //For product (left side)
    const [searchText, setSearchText] = useState("");
    const [isDeletingProduct, setIsDeletingProduct] = useState(false);
    const [loading, setLoading] = useState(false);
    const [storeProducts, setStoreProducts] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    //For cart (right side)
    const [orderItems, setOrderItems] = useState([]);
    const [isAddingProduct, setIsAddingProduct] = useState(false);
    //For product action (action bar)
    const [selectedProduct, setSelectedProduct] = useState(null);
    //On press add product button. Hide the cart section and show the add product 
    const [isAddProduct, setIsAddProduct] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    //Snackbar and other misc
    const { showSnackbar } = useGlobalSnackbar();
    const { showDialog, hideDialog, setWaitting } = useGlobalConfirmDialog();
    //Currently unused
    const btnTextAnimateClassName = isTransitioning ? cx("state-slide-down-txt") : "";
    //Use api on first render and when page change
    useEffect(() => {
        fetchProducts();
        console.log("Page index: ", pageIndex);
    }, [pageIndex]);

    useEffect(() => {
        console.log("Selected product: ", selectedProduct);

    }, [selectedProduct]);
    //API
    const fetchProducts = async (filter) => {
        try {
            setLoading(true);
            if (!filter) {
                filter = {};
            }

            const response = await ProductApiController.getProducts(
                {
                    page: pageIndex,
                    limit: paginationLimit,
                    productName: filter.productName ? filter.productName : null,
                    type: filter.type ? filter.type : null,
                    sellPriceFilter: filter.sellPriceFilter ? filter.sellPriceFilter : null,

                });
            console.log("Response: ", response);
            const results = response.data.results;
            console.log("Results: ", results);
            //Test convert id to object id
            totalCounts = response.data.totalFilterCount;
            setStoreProducts(results);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        setSelectedProduct(null);
        fetchProducts({ productName: searchText });
    }, [searchText]);
    //On search text change
    const onSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };
    //Add a new product to DB
    const addProductHandler = async ({
        productName,
        type,
        brand,
        manufacturer,
        countryOrigin,
        sellPrice,
        importPrice,
        quantity = 0,
        images,
    }) => {
        try {
            setIsAddingProduct(true);
            //If any is null/undefined, return, except imgs
            if (!productName || !type || !brand || !manufacturer || !countryOrigin || !sellPrice || !importPrice || !quantity) {
                console.log("Missing field");
                return;
            }
            //Multipart form. Apppend each
            const formData = new FormData();
            formData.append("productName", productName);
            formData.append("type", type);
            formData.append("brand", brand);
            formData.append("manufacturer", manufacturer);
            formData.append("countryOrigin", countryOrigin);
            formData.append("sellPrice", sellPrice);
            formData.append("importPrice", importPrice);
            formData.append("quantity", quantity);
            for (let i = 0; i < images.length; i++) {
                formData.append("images", images[i]);
            }
            const response = await ProductApiController.addProduct(formData);
            if (response.status === 200) {
                console.log("Add product successfully");
                showSnackbar("Add product successfully", "success");
            }
            else {
                showSnackbar("Add product failed", "error");
                console.log("Add product failed: ", response);
            }

            return response;
        } catch (error) {
            return error;
        }
        finally {
            setIsAddingProduct(false);
        }
    };
    //Delete the selected product
    const deleteProductHandler = async () => {
        console.log("Delete product: ", selectedProduct);
        showDialog({
            header: "Delete product",
            message: "Are you sure you want to delete this product?",
            onConfirm: async () => {
                setWaitting(true);
                try {
                    setIsDeletingProduct(true);
                    const response = await ProductApiController.deleteProduct(selectedProduct._id);
                    if (response.success) {
                        console.log("Delete product successfully");
                        showSnackbar("Delete product successfully", "success");
                        //Reset selected product
                        switchProductBorderColor(selectedProduct);
                        setSelectedProduct(null);
                        //Update products
                        await fetchProducts();
                        hideDialog();
                    }
                    else {
                        console.log("Delete product failed");
                        showSnackbar("Delete product failed", "error");
                        hideDialog();
                    }
                }
                catch (error) {
                    console.error("Error deleting product:", error);
                    hideDialog();
                }
                finally {
                    setIsDeletingProduct(false);

                }

            },
            onCancel: () => {
                hideDialog();
            },

        });
    };
    //Make a new order. Add to db on success
    async function makeOrderHandler() {
        try {
            setIsOrdering(true);
            //An array that contains [ {productId, quantity}, {productId, quantity}, ...]
            //Json format
            let order = {};
            const orderDetails = [];
            orderItems.forEach((item) => {
                orderDetails.push({ productId: item.product._id, quantity: item.quantity });
            });
            if (orderCustomerId === null) {
                console.log("Missing field customerId");
                return;
            }
            if (orderDetails.length === 0) {
                console.log("Order is empty");
                return;
            }
            order.customerId = orderCustomerId;
            order.orderDetails = orderDetails;
            order.employeeId = UserApiController.user.employeeId;
            //Create order
            const response = await OrderApiController.addOrder(order);
            const orderId = response.data.order._id;
            console.log("Response: ", response);
            if (response.success) {
                console.log("Make order successfully");
                showSnackbar("Make order successfully", "success");
                clearOrder();
            }
            else {
                showSnackbar("Make order failed", "error");
                console.log("Make order failed");
            }
            console.log("Order id: ", orderId);
            if (orderStatus === "Delivered") {
                const response = await OrderApiController.setOrderDelivered(orderId);
                if (response.success) {
                    showSnackbar("Order is delivered", "success");
                }
                else {
                    showSnackbar("Set order delivered failed", "error");
                    console.log("Set order delivered failed");
                    console.log("Response: ", response);
                }
            }
            else {
                showSnackbar("Order is pending", "success");
            }

            setIsOrdering(false);
        }
        catch (error) {
            console.error("Error making order:", error);
            setIsOrdering(false);
        }
        finally {
            setIsOrdering(false);
        }
    }
    // Misc functions
    const clearOrder = () => {
        setOrderItems([]);
        setOrderCustomerId(null);
    };
    //On options change
    const handleOptionsChange = (option) => {
        setSelectedFilterOption(option.value);
    };
    useEffect(() => {
        fetchProducts({ type: selectedFilterOption });
        setPageIndex(1);
    }, [selectedFilterOption]);
    //Used to update quantity to current cart
    const cart_UpdateProductQuantity = (index, increment) => {
        // Make a copy of the order items array
        let newItems = [...orderItems];
        if (newItems[index].quantity === 0 && increment === -1) {
            newItems = newItems.filter((item) => item.product._id !== newItems[index].product._id);
            setOrderItems(newItems);
            return;
        }
        // Only decrement if the quantity is greater than 0
        if (newItems[index].quantity === 0 && increment === -1) {
            return;
        }
        // If the quantity is 1 and the user decrements, remove the item from the cart. Use _id 

        // Otherwise, update the quantity of the item
        newItems[index].quantity += increment;
        console.log("New items: ", newItems);
        // Set the new items array as the state
        setOrderItems(newItems);
    };

    //Add to cart function
    const cart_addProduct = (product) => {
        //Check if is cart
        if (isAddProduct) {
            return;
        }
        //If product quantity is 0, return
        if (product.quantity === 0) {
            showSnackbar("Product is out of stock", "error");
            return;
        }

        // Make a copy of the order items array
        let newItems = [...orderItems];
        // Check if the product is already in the cart
        const index = newItems.findIndex((item) => item.product._id === product._id);
        // If the product is not in the cart
        if (index === -1) {
            // Add the product to the cart with a quantity of 1


            newItems.push({ product: product, quantity: 1 });
        } else {
            //If current quantity when increased is greater than quantity of product, return
            if (newItems[index].quantity + 1 > product.quantity) {
                showSnackbar("Can't add more than quantity of product", "error");
                return;
            }
            // Otherwise, increment the quantity of the product in the cart

            newItems[index].quantity++;
        }
        // Set the new items array as the state
        setOrderItems(newItems);

    }

    //Product select for actions.
    //Generally used for delete product
    //Also used to edit product
    const onProductSelect = (product) => {
        switchProductBorderColor(product);
        setSelectedProduct((prevSelectedProduct) =>
            JSON.stringify(prevSelectedProduct) === JSON.stringify(product) ? null : product
        );

    };
    //Change border color of selected product
    const switchProductBorderColor = (product) => {
        if (!product)
            return;

        //If same product, change it back to normal
        if (selectedProduct && selectedProduct._id === product._id) {
            const element = document.getElementById(product._id);
            if (element) {
                element.style.borderColor = "";
                //Reset border width
                element.style.borderWidth = "";
            }
            return;
        }
        //Change border color of current selected to normal, if any
        if (selectedProduct) {
            const element = document.getElementById(selectedProduct._id);
            if (element) {
                element.style.borderColor = "";
                //Reset border width
                element.style.borderWidth = "";
            }
        }
        //Change border color of next selected to green
        const element = document.getElementById(product._id);
        if (element) {
            element.style.borderColor = "green";
            //Increase border width
            element.style.borderWidth = "thick";
        }

    }

    //Switch between cart and add product form/ also manage state of transition
    function switchBetweenCartAndProduct() {
        setIsTransitioning(true);
        setTimeout(() => {
            setIsAddProduct(!isAddProduct);
            //Reset selected product
            switchProductBorderColor(selectedProduct);
            setSelectedProduct(null);
            setIsTransitioning(false);
        }, transitionTime);
    }
    //Add quantity to product 
    const addQuantityToProduct = async (quantity) => {
        if (selectedProduct) {
            try {
                const res = await ProductApiController.updateProduct({
                    _id: selectedProduct._id,
                    productAction: "add",
                    productActionQuantity: quantity
                });
                console.log("Response: ", res);
            }
            catch (error) {
                console.log("Add quantity to product failed");
                console.log("Error: ", error);
            }

        }
    }
    //************************************ */

    return (
        <div className={cx("container")}>
            <div className={cx("header")}>
                <h1>Product</h1>
            </div>
            <div className={cx("btn-bar")}>
                <span className={cx("left-side-btn-group")}>
                    <span>
                        <input className={cx("search-bar")} type="text number" placeholder="Product name" onChange={onSearchTextChange} />
                    </span>
                    <span>


                    </span>
                </span>

            </div>
            <div className={cx("selectionBar")}>
                {options.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => handleOptionsChange(option)}
                        className={`${cx("selectionItem")} ${option.value === selectedFilterOption ? styles.selected : ""
                            }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
            <div className={cx("wrapper")}>
                <div className={cx("wrapper-left")}>
                    <div className={loading ? cx("loading") : cx("products")}>
                        <ListWithLoading
                            isLoading={loading}
                            data={storeProducts}
                            renderItem={(item, index) => <Product key={index} productData={item}
                                onClick={() => cart_addProduct(item)} />}
                        />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                        <Pagination
                            count={Math.ceil(totalCounts / paginationLimit)}
                            page={pageIndex}
                            onChange={(event, value) => setPageIndex(value)}
                            className={styles.pagination}
                            variant="outlined"
                            shape="rounded"
                            color="primary"
                        />
                    </div>
                </div>
                <div className={cx("wrapper-right")}>

                    <div className={cx("product-cart-container")}>
                        {isOrdering ? (
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                                <CircularProgress
                                    size={50} thickness={5}
                                    sx={{
                                        color: "#2C7A51"
                                    }}
                                    className={cx("circular-progress")} />
                            </div>
                        ) : (
                            <ProductCart
                                clearOrder={clearOrder}
                                orderItems={orderItems}
                                updateQuantity={cart_UpdateProductQuantity}
                                taxRate={taxRate}
                                addtionalContainerClassName={cx({
                                    [cx("state-slide-out")]: isTransitioning,
                                })}
                                onSubmit={makeOrderHandler}
                                setOrderCustomer={setOrderCustomerId}
                                setOrderStatus={setOrderStatus}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductSaleFront;