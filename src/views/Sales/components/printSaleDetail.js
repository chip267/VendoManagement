// PrintSaleDetail.js

import React from 'react';
import PrintSaleDetailContent from './printSaleDetailContent';
import styles from '../sales.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const PrintSaleDetail = ({ sale, taxRate }) => {
    return (
        <div className={cx('sale-detail-form')} style={{ display: "none" }} >
            <PrintSaleDetailContent sale={sale} taxRate={taxRate} />
        </div>
    );
}

export default PrintSaleDetail;