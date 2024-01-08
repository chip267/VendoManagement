// PrintSaleDetailContent.js

import React from 'react';
import styles from '../sales.module.scss';
import classNames from 'classnames/bind';
import OrderItem from '../../Products/components/orderItem';
import SaleOrderInformation from './saleOrderInformation';

const cx = classNames.bind(styles);

const PrintSaleDetailContent = ({ sale, taxRate }) => {
    const getSubtotal = () => {
        let subtotal = 0;
        sale.orderDetails.forEach((item) => {
            subtotal += item.productId.sellPrice * item.quantity;
        });
        return subtotal;
    };

    return (
        <div className={cx('sale-detail-form')} style={{ display: "none" }}>
            <div className={styles.items}>
                {sale.orderDetails
                    .map((item, index) => (
                        <OrderItem
                            key={index}
                            index={index}
                            itemData={{ product: item.productId, quantity: item.quantity }}
                            preventEdit={true}
                        />
                    ))}
            </div>
            <div className={cx('customer-info')}>
                <div>
                    <span className={cx('customer-label')}>
                        Customer: </span>

                    <span className={cx('customer-name')}>
                        {sale.customerId ? sale.customerId.name : "No customer found"} </span>

                </div>
            </div>
            <SaleOrderInformation
                order={sale}
                taxRate={taxRate}
                submitButton={null}
            />
        </div>
    );
};

export default PrintSaleDetailContent;
