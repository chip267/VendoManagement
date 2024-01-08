import React from "react";
import styles from '../dashboard.module.scss';
import classNames from "classnames/bind";
import { Tooltip } from "@mui/material";

const cx = classNames.bind(styles);

const BestSellingItem = ({ name, price, code, imageURL }) => {
    const shortenProductName = (name, count = 15) => {
        if (name.length > count) {
            return name.slice(0, count) + "...";
        }
        return name;
    };
    const toShortPrice = (price) => {
        //Add k to every 1000
        if (price >= 1000) {
            return `${price / 1000}k`;
        }
        return price;
    }

    return (
        <Tooltip title={`Product name: ${name}.
        Sold: ${code} 
        Price:${toShortPrice(price)}
        `}
            placement="top">
            <tr className={cx("data")}>
                <td className={cx("product")}>
                    <div className={cx("img-container")}>
                        <img src={imageURL} alt="product" className={cx("product-img")} />
                    </div>
                    <div className={cx("product-name")}>{shortenProductName(name)}</div>
                </td>
                <td className={cx("sold-count")}>
                    <div>{code}</div>
                </td>
                <td className={cx("price")}>
                    <div>{toShortPrice(price)}</div>
                </td>
            </tr>
        </Tooltip>
    );
};

export default BestSellingItem;
