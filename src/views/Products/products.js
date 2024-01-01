import React, { useState } from "react";
import styles from "./products.module.scss";
import classNames from "classnames/bind";
import Product from "./components/product";
import ProductCart from "./components/productCart";
import ProductApiController from "../../api/products";
import ListWithLoading from "../GeneralComponents/ListWithLoading";
import AddProductForm from "./components/addProductForm";
import { Pagination } from "@mui/material";
import { useEffect } from "react";
import { IMG_Logo } from "../../assets/images";
import ObjectID from "bson-objectid";
const cx = classNames.bind(styles);
const imgUrlTest = IMG_Logo
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
const cartItems = [
  {
    name: "Western Digital Elements",
    image: imgUrlTest,
    price: 1290000,
    quantity: 2,
  },
  {
    name: "Western Digital Elements",
    image: imgUrlTest,
    price: 1290000,
    quantity: 2,
  }
];
const taxRate = 0.03;
//Store products will include current page products, next page number and previous page number.
//And total counts of products.
//Each time a page change happens, we will update store products by calling api.
//Get total counts of products from api
async function initStoreProducts() {
  const response = await ProductApiController.getProducts({ page: 1, limit: maxItemPerPage });
  const results = response.data.results;
  totalCounts = response.data.totalDocuments;
  console.log("Init store products: ", results);
  return results;
}




//As array
function initCartItems() {
  return cartItems;
}
const transitionTime = 500;

const Products = () => {
  // Use a state variable to store the current selected option
  const [selectedOption, setSelectedOption] = useState('null');
  const [loading, setLoading] = useState(false);
  const [storeProducts, setStoreProducts] = useState(() => initStoreProducts());
  const [pageIndex, setPageIndex] = useState(1);
  const [orderItems, setOrderItems] = useState(() => initCartItems());
  //On press add product button. Hide the cart section and show the add product 
  const [isAddProduct, setIsAddProduct] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  //Currently unused
  const btnTextAnimateClassName = isTransitioning ? cx("state-slide-down-txt") : "";
  //Use api on first render and when page change
  useEffect(() => {
    fetchProducts();
  }, [pageIndex]);
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

  const addProduct = async ({
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
      }
      return response;
    } catch (error) {
      return error;
    }
  };

  // Define a function that handles the change of the selected option
  const handleChange = (option) => {
    setSelectedOption(option);
  };
  // Define a function that updates the quantity of an item
  const updateQuantity = (index, increment) => {
    // Make a copy of the order items array
    let newItems = [...orderItems];
    // Only decrement if the quantity is greater than 0
    if (increment < 0 && newItems[index].quantity <= 0) {
      return;
    }
    // Update the quantity of the item at the given index
    newItems[index].quantity += increment;
    // Set the new items array as the state
    setOrderItems(newItems);
  };

  // Define a function that calculates the subtotal of the order
  const getSubtotal = () => {
    // Initialize the subtotal as zero
    let subtotal = 0;
    // Loop through the order items and add the product of price and quantity to the subtotal
    for (let item of orderItems) {
      subtotal += item.price * item.quantity;
    }
    // Return the subtotal
    return subtotal;
  };
  // Define a function that calculates the tax of the order
  const getTax = () => {
    // Return the product of the subtotal and the tax rate
    return getSubtotal() * taxRate;
  };
  // Define a function that calculates the total of the order
  const getTotal = () => {
    // Return the sum of the subtotal and the tax
    return getSubtotal() + getTax();
  };

  // Define a function that clears the order
  const clearOrder = () => {
    // Set the order items array as an empty array
    setOrderItems([]);
  };
  //************************************ */
  //Switch between cart and add product
  function switchCartAndAddProduct() {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsAddProduct(!isAddProduct);
      setIsTransitioning(false);
    }, transitionTime);
  }
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
              onClick={switchCartAndAddProduct}>
              <div className={btnTextAnimateClassName}>
                {isAddProduct ? "Order" : "Add product"}
              </div>
            </button>
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
      <div className={cx("wrapper")}>
        <div className={cx("wrapper-left")}>
          <div className={cx("selectionBar")}>
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleChange(option)}
                className={`${cx("selectionItem")} ${option.value === selectedOption.value && selectedOption !== null ? styles.selected : ""
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className={cx("products")}>
            <ListWithLoading
              isLoading={loading}
              data={storeProducts}
              renderItem={(item, index) => <Product key={index} productData={item} />}
            />
          </div>
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
        <div className={cx("wrapper-right")}>
          {!isAddProduct ? (
            <ProductCart
              clearOrder={clearOrder}
              orderItems={orderItems}
              updateQuantity={updateQuantity}
              taxRate={taxRate}
              addtionalContainerClassName={cx({
                [cx("state-slide-out")]: isTransitioning,
              })}
            />
          ) : (
            <AddProductForm
              addProductHandler={addProduct}
              addtionalContainerClassName={cx({
                [cx("state-slide-down")]: isTransitioning,
              })}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;