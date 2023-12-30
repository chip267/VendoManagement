
import React from 'react';
import styles from '../products.module.scss';
import OrderItem from './orderItem';
import OrderInformation from './orderInformation';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function ProductCart({ clearOrder, orderItems, updateQuantity, taxRate = 0.03, key, addtionalContainerClassName }) {
    return (<div className={styles.payment + " " + addtionalContainerClassName} key={key}>
        <div className={styles.heading}>
            <h1>Customer Order</h1>
            <button className={styles.clear} onClick={clearOrder}>
                Clear
            </button>
        </div>
        <div className={styles.items}>
            {orderItems.map((item, index) => <OrderItem key={index} itemData={item} index={index} updateQuantity={updateQuantity} />)}
        </div>
        <OrderInformation items={orderItems} taxRate={taxRate} />
    </div>);
}
export default ProductCart;