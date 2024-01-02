import React from 'react';
import styles from '../../products.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
//Status mean selecting a product. Will be true if it has product
const DeleteProductButton = ({ onDelete, status }) => {
    return (
        <button
            className={cx('delete-product-button', cx({ 'disabled': !status }))}
            onClick={onDelete}
            disabled={!status ? true : false}
        >
            {!status ? 'Select a product' : 'Delete'}
        </button>
    );
};

export default DeleteProductButton;
