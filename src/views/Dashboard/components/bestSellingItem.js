import React from "react";
import styles from '../dashboard.module.scss';
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const BestSellingItem = ({ name, price, code, imageURL }) => {
    return (
        <tr className={cx("data")}>
            <td className={cx("product")}>
                <div className={cx("img-container")}>
                    <img src={imageURL} alt="product" className={cx("product-img")} />
                </div>
                <div className={cx("product-name")}>{name}</div>
            </td>
            <td className={cx("code")}>
                <div>{code}</div>
            </td>
            <td className={cx("price")}>
                <div>{price}</div>
            </td>
        </tr>


    );
}

export default BestSellingItem;