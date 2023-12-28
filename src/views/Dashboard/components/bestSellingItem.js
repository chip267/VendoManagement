import React from "react";
import styles from '../dashboard.module.scss';
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const BestSellingItem = ({ title, price, imageURL }) => {
    return (
        <tr className={cx("data")}>
            <td className={cx("product")}>
                <div className={cx("img-container")}>
                    <img src={imageURL} alt="product" className={cx("product-img")} />
                </div>
                <div className={cx("product-name")}>Product Name 1</div>
            </td>
            <td className={cx("code")}>
                <div>ABC123</div>
            </td>
            <td className={cx("price")}>
                <div>{price}</div>
            </td>
        </tr>


    );
}

export default BestSellingItem;