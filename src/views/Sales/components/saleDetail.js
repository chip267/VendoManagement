//A form of sale data. That is similiar to product cart in products.js
//Data is editable on customer, employee and status, maybe reduce the quantity of product
//If status is Delivered, the sale data is not editable
import React, { useState, useEffect } from 'react';
import styles from '../sales.module.scss';
import classNames from 'classnames/bind';
import OrderItem from '../../Products/components/orderItem';
import SaleOrderInformation from './saleOrderInformation';
import CustomerSearchbar from '../../Products/components/customerSearchbar';
import PrintSaleOrderInformation from './printSaleOrderInformation';
import ReactToPrint from 'react-to-print';
import PrintSaleDetail from './printSaleDetail';
import { useRef } from 'react';
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { IMG_Logo } from '../../../assets/images';
const cx = classNames.bind(styles);

const SaleDetail = ({
    sale,
    updateSale = null,
    deleteSale = null, //cancel sale
    onSubmit = null,
    taxRate = 0.03,
    printMode = false,
}) => {
    const [orderCustomer, setOrderCustomer] = useState(sale.customerId ? sale.customerId._id : null);
    const [products, setProducts] = useState(sale.orderDetails.map((item) => { return { product: { ...item }.productId, quantity: item.quantity } }));
    //Cant change employee who made the order
    const [orderStatus, setOrderStatus] = useState(sale.status);
    const componentRef = useRef();

    useEffect(() => {
        console.log("New information for update: ");
        console.log("Customer: ", orderCustomer);
        console.log("Status: ", orderStatus);
        console.log("Products: ", products);
    }, [orderStatus, products, orderCustomer]);
    const getSubtotal = () => {
        let subtotal = 0;
        sale.orderDetails.forEach((item) => {
            subtotal += item.productId.sellPrice * item.quantity;
        });
        return subtotal;
    };
    const updateQuantity = (index, increment) => {
        let newItems = [...products];
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
        console.log(newItems);
        // Set the new items array as the state
        setProducts(newItems);
    };


    const SubmitButton = (onPress) => {
        return (
            <>
                {sale.status === "Delivered" || sale.status === "Cancelled" ? (
                    <>
                        {sale.status === "Delivered" ? (
                            <div className={cx('btn-payment-disabled')}>
                                <button className={cx('btn')}>Already delivered</button>
                            </div>
                        ) : (
                            <div className={cx('btn-payment-disabled')}>
                                <button className={cx('btn')}>Already cancelled</button>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className={cx('btn-payment')} onClick={handleUpdate}>
                            < button className={cx('btn')}>Update</button>
                        </div>


                    </>
                )
                }
            </>
        );
    };
    const handleUpdate = () => {
        //New order details if duplicate, will override the old one
        //Check if there is any duplicate product


        const saleDataToUpdate = {
            _id: sale._id,
            customerId: orderCustomer,
            status: orderStatus,
            newOrderDetails: products.map((item) => {
                //Null check
                if (!item.product) {
                    return null;
                }
                else {
                    return {
                        productId: item.product._id,
                        quantity: item.quantity
                    }
                }
            })

        }
        console.log("Sale data to update: ", saleDataToUpdate);
        if (updateSale) {
            updateSale(saleDataToUpdate);
        }
    }


    const handleCancel = () => {
        console.log("Submit");
    }
    const toShorterName = (name) => {
        const num = 10;
        if (name.length > num) {
            return name.slice(0, num) + "...";
        }
        else {
            return name;
        }
    }

    return (
        <div>
            {!printMode &&
                (
                    <div className={cx('sale-detail-form')}
                        key={sale.id}>
                        <div className={styles.heading}>
                            <h1 >Sale Details</h1>
                            <div className={styles.buttons}>

                                <button className={cx('btn')} onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                        <div className={styles.items}>
                            {products
                                .map((item, index) => (
                                    <OrderItem
                                        key={index}
                                        index={index}
                                        itemData={{ product: item.product, quantity: item.quantity }}
                                        updateQuantity={updateQuantity}
                                        preventEdit={sale.status === "Delivered" || sale.status === "Cancelled"}
                                    />
                                ))}
                        </div>
                        <div className={cx('customer-search-bar')}>
                            {sale.status === "Delivered" || sale.status === "Cancelled"
                                ? (
                                    <div className={cx('customer-info')}>
                                        <div>
                                            <span className={cx('customer-label')}>
                                                Customer: </span>

                                            <span className={cx('customer-name')}>
                                                {sale.customerId ? sale.customerId.name : "No customer found"} </span>

                                        </div>

                                    </div>
                                ) : (
                                    <CustomerSearchbar
                                        setOrderCustomer={setOrderCustomer}
                                        defaultCustomer={sale.customerId ? sale.customerId : null}
                                    />
                                )}
                        </div>
                        <SaleOrderInformation
                            order={sale}
                            taxRate={taxRate}
                            submitButton={SubmitButton(onSubmit)}
                            setStatusFromParent={setOrderStatus}
                        />

                    </div >
                )
            }
            {
                printMode && (
                    <>

                        <div className={cx('sale-detail-form')} ref={componentRef}
                            style={{ height: "60vh" }}
                            key={sale.id}>
                            <div className={cx('heading-print')}>
                                <img src={IMG_Logo} alt="logo" className={styles.logo} />

                                <h1
                                >Sale Details</h1>

                            </div>
                            <div className={styles.items}>
                                {products
                                    .map((item, index) => (
                                        //Display name , sellPrice and quantity
                                        <div className={cx('item-print')} key={index}>
                                            <div className={cx('item-name')}>
                                                {item.product.productName}
                                            </div>


                                            <div className={cx('item-print-row')}>

                                                <div className={cx('item-price')}>
                                                    Price: {item.product.sellPrice}
                                                </div>
                                                <div className={cx('item-quantity')}>
                                                    Quantity: {item.quantity}
                                                </div>
                                                <div className={cx('item-total-unit')}>
                                                    Total: {item.product.sellPrice * item.quantity}

                                                </div>
                                            </div>

                                        </div>
                                    ))}
                            </div>
                            <div
                                style={{ width: "100%", height: "1px", backgroundColor: "black", marginBottom: "10px" }}
                            ></div>

                            <div className={cx('customer-search-bar')}>
                                <div className={cx('customer-info-print')}>
                                    <div>
                                        <span className={cx('customer-label')}>
                                            Customer: </span>

                                        <span className={cx('customer-name')}>
                                            {sale.customerId ? sale.customerId.name : "No customer found"} </span>

                                    </div>
                                    <div>
                                        <span className={cx('customer-label')}>
                                            Employee: </span>

                                        <span className={cx('customer-name')}>
                                            {sale.employeeId ? sale.employeeId.name : "No employee found"} </span>
                                    </div>
                                </div>
                            </div>
                            <PrintSaleOrderInformation
                                order={sale}
                                taxRate={taxRate}
                                setStatusFromParent={setOrderStatus}
                            />
                        </div >

                    </>


                )
            }
            {
                printMode && (
                    <div className={cx('print-btn-container')}>
                        <ReactToPrint
                            trigger={() => <button className={cx('print-btn')}
                            >Print</button>}
                            content={() => componentRef.current}
                        />
                    </div>

                )
            }
        </div >

    );
};




export default SaleDetail;
