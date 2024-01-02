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
const cx = classNames.bind(styles);

//PRODUCT PAGE CONSTANTS:
const maxItemPerPage = 6;
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
async function initStoreProducts() {
  const response = await ProductApiController.getProducts({ page: 1, limit: maxItemPerPage });
  const results = response.data.results;
  totalCounts = response.data.totalDocuments;
  return results;
}


const Products = () => {
  // Option for the type bar.
  const [selectedOption, setSelectedOption] = useState('null');
  //For order section
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderCustomerId, setOrderCustomerId] = useState(null);
  //Used to check if customer buy at store,if yes, set order status to  "Delivered"
  const [orderStatus, setOrderStatus] = useState(null);
  //For product (left side)
  const [loading, setLoading] = useState(false);
  const [storeProducts, setStoreProducts] = useState(() => initStoreProducts());
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
  const { showDialog } = useGlobalConfirmDialog();
  //Currently unused
  const btnTextAnimateClassName = isTransitioning ? cx("state-slide-down-txt") : "";
  //Use api on first render and when page change
  useEffect(() => {
    fetchProducts();
  }, [pageIndex]);
  useEffect(() => {
    console.log("Selected product: ", selectedProduct);

  }, [selectedProduct]);
  //API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await ProductApiController.getProducts({ page: pageIndex, limit: maxItemPerPage });
      const results = response.data.results;
      //Test convert id to object id
      totalCounts = response.data.totalDocuments;
      setStoreProducts(results);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
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

  //Used to update quantity to current cart
  const cart_UpdateProductQuantity = (index, increment) => {
    // Make a copy of the order items array
    let newItems = [...orderItems];
    // Only decrement if the quantity is greater than 0
    if (newItems[index].quantity === 0 && increment === -1) {
      return;
    }
    // If the quantity is 0 and the increment is -1, remove the item from the array
    if (newItems[index].quantity === 0 && increment === -1) {
      newItems.splice(index, 1);
    }
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

  //************************************ */

  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <h2>Product</h2>
      </div>
      <div className={cx("btn-bar")}>
        <span className={cx("left-side-btn-group")}>
          <span>
            <input className={cx("search-bar")} type="text number" placeholder="Search" />
          </span>
          <span>
            <button className={cx("btn-add")}
              onClick={switchBetweenCartAndProduct}>
              <div className={btnTextAnimateClassName}>
                {isAddProduct ? "To order section" : "To manage product"}
              </div>
            </button>
            {!isAddProduct ? null : (
              <DeleteProductButton
                onDelete={deleteProductHandler}
                status={selectedProduct}
              />
            )}
          </span>
        </span>
        <span className={cx("right-side-btn-group")}>
          <span className={cx("btn-plus") + " right-side-plus-btn"}>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
              </svg>
            </button>
          </span>
          <span className={cx("btn-setting") + " right-side-setting-btn"}>
            <button>
              <svg className={cx("sliders-logo")} xmlns="http://www.w3.org/2000/svg" height="17" width="17" viewBox="0 0 512 512">
                <path opacity="1" fill="#1E3050" d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z" />
              </svg>
            </button>
          </span>
        </span>
      </div>
      <div className={cx("selectionBar")}>
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelectedOption(option)}
            className={`${cx("selectionItem")} ${option.value === selectedOption.value && selectedOption !== null ? styles.selected : ""
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
                onClick={() => isAddProduct ? onProductSelect(item) : cart_addProduct(item)} />}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <Pagination
              count={Math.ceil(totalCounts / maxItemPerPage)}
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
          {!isAddProduct ? (
            <div className={cx("product-cart-container")}>
              {isOrdering ? (
                <CircularProgress size={50} thickness={5} className={cx("circular-progress")} />
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
          ) : (
            <div className={cx("add-product-container")}>
              {isAddingProduct ? (
                <CircularProgress size={50} thickness={5} className={cx("circular-progress")} />
              ) : (
                <AddProductForm
                  addProductHandler={addProductHandler}
                  addtionalContainerClassName={cx({
                    [cx("state-slide-down")]: isTransitioning,
                  })}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;