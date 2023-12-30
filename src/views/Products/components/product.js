
import React from "react";
import classNames from "classnames/bind";
import styles from "../products.module.scss";
const cx = classNames.bind(styles);
const Product = ({ productData, onClick }) => {
    return (
        <div className={cx("product")} key={productData.id} id={productData.id}>
            <img src={productData.images[0].url} className={cx("productImage")} alt="Product" />
            <div className={cx("productDetail")}>
                <div className={cx("productName")}> {productData.productName}</div>
                <div className={cx("productType")}> {productData.type}</div>
                <div className={cx("productPrice")}> {productData.sellPrice} vnd</div>
            </div>
        </div>
    );

};
export default Product;