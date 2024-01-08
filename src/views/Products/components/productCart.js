
import React from 'react';
import styles from '../products.module.scss';
import OrderItem from './orderItem';
import OrderInformation from './orderInformation';
import classNames from 'classnames/bind';
import CustomerSearchbar from './customerSearchbar';
const cx = classNames.bind(styles);

function ProductCart({
    clearOrder,
    orderItems,
    updateQuantity,
    taxRate = 0.03,
    key,
    addtionalContainerClassName,
    onSubmit = null,
    setOrderCustomer = null,
    setOrderStatus = null
}) {
    const SubmitButton = (onPress) => {
        return (
            <div className={cx("btn-payment")} onClick={onPress}>
                <button className={cx("btn")}>Process</button>
            </div>
        );
    }
    return (<div className={styles.payment + " " + addtionalContainerClassName} key={key}>
        <div className={styles.heading}>
            <h2
                style={{
                    fontSize: "1.2rem", marginBottom: "0"
                }}
            >Customer Order</h2>
            <button className={styles.clear} onClick={clearOrder}>
                Clear
            </button>
        </div>
        <div className={styles.items}>
            {orderItems.map((item, index) => <OrderItem index={index} key={index}
                itemData={item}
                updateQuantity={updateQuantity}
            />)}
        </div>
        <div className={cx("customer-search-bar")}>
            <CustomerSearchbar setOrderCustomer={setOrderCustomer} />
        </div>
        <OrderInformation
            items={orderItems}
            taxRate={taxRate}
            submitButton={SubmitButton(onSubmit)}
            setOrderStatus={setOrderStatus}
        />
    </div >);
}
export default ProductCart;