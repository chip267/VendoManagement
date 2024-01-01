
import React from "react";
import classNames from "classnames/bind";
import styles from "../products.module.scss";
const cx = classNames.bind(styles);
const Product = ({ productData, onClick }) => {
    return (
        <div className={cx("product")} key={productData._id} id={productData._id} onClick={onClick}>
            <img src={productData.images ? productData.images[0].url : ""} alt="product" className={cx("productImage")} onClick={onClick} />
            <div className={cx("productDetail")}>
                <div className={cx("productName")}> {productData.productName}</div>
                <div className={cx("productType")}> {productData.type}</div>
                <div className={cx("productPrice")}> {productData.sellPrice} vnd</div>
                <div className={cx("productQuantity") + " " + (productData.quantity <= 0 ? cx("out-of-stock") : cx("in-stock"))}>
                    {productData.quantity} left</div>

                <div className={cx("productBrand")}> {productData.brand}</div>
                <div className={cx("productManufacturer")}> {productData.manufacturer}</div>
                <div className={cx("productCountryOrigin")}> {productData.countryOrigin}</div>
                <div className={cx("productImportPrice")}> {productData.importPrice}</div>
                <div className={cx("productImages")}> {productData.images ? <img src={productData.images[0].url} alt="product" /> : ""}</div>

            </div>
        </div>
    );

};
export default Product;