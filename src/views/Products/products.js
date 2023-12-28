import React, { useState } from "react";
import styles from "./products.module.scss";
import classNames from "classnames/bind";
import Product from "./components/product";
import OrderItem from "./components/orderItem";
import OrderInformation from "./components/orderInformation";
import { IMG_Logo } from "../../assets/images";
const cx = classNames.bind(styles);
const imgUrlTest = IMG_Logo

// Define the options for the selection bar
const options = [
  { value: "all", label: "All products" },
  { value: "hard-drive", label: "Hard drive" },
  { value: "ssd", label: "SSD" },
  { value: "ram", label: "Ram" },
  { value: "rom", label: "Rom" },
];
// Define the tax rate
const taxRate = 0.004;

// Define the product component
const Products = () => {
  // Use a state variable to store the current selected option
  const [selectedOption, setSelectedOption] = useState('null');
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
    },

  ];

  const storeProducts = [
    {
      name: "Western Digital Elements",
      price: "1290000 d",
      type: "Hard drive",
      id: "1",
      imgUrl: imgUrlTest
    },
    {
      name: "Western Digital Elements",
      price: "1290000 d",
      type: "Hard drive",
      id: "2",
      imgUrl: imgUrlTest
    },
    {
      name: "Western Digital Elements",
      price: "1290000 d",
      type: "Hard drive",
      id: "1",
      imgUrl: imgUrlTest
    },
    {
      name: "Western Digital Elements",
      price: "1290000 d",
      type: "Hard drive",
      id: "2",
      imgUrl: imgUrlTest
    },
    {
      name: "Western Digital Elements",
      price: "1290000 d",
      type: "Hard drive",
      id: "1",
      imgUrl: imgUrlTest
    },
    {
      name: "Western Digital Elements",
      price: "1290000 d",
      type: "Hard drive",
      id: "2",
      imgUrl: imgUrlTest
    },
  ];

  // Define a function that handles the change of the selected option
  const handleChange = (option) => {
    setSelectedOption(option);
  };

  //************************************ */
  // Use a state variable to store the items
  const [orderItems, setOrderItems] = useState(cartItems);

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
            <button className={cx("btn-add")}>+ Add Items</button>
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
            {storeProducts.map((product) => (
              <Product productData={product} />
            ))}
          </div>
        </div>
        <div className={cx("wrapper-right")}>
          <div className={styles.payment}>
            <div className={styles.heading}>
              <h1>Customer Order</h1>
              <button className={styles.clear} onClick={clearOrder}>
                Clear
              </button>
            </div>
            <div className={styles.items}>
              {orderItems.map((item, index) => (
                <OrderItem
                  key={index}
                  itemData={item}
                  index={index}
                  updateQuantity={updateQuantity}
                />
              ))}
            </div>
            <OrderInformation items={orderItems} taxRate={taxRate} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Products;